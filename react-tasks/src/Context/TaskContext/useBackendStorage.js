import React, { useEffect } from 'react';

function useBackendStorage(key, initialValue){

  const[item, setItem] = React.useState(initialValue);
  const[loading, setLoading] = React.useState(true);
  const[error, setError] = React.useState(null);

  //test sessionStorange
  // const [idUser, setIdUser] = React.useState(() => {
  //   return sessionStorage.getItem('idUser') || "1"; // Usa "1" como valor por defecto si no hay idUser
  // });

  // obtener el idUser
  const getIdUser = () => sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).id : null;

  const [idUser, setIdUser] = React.useState(getIdUser);

  useEffect(() => {
    const handleStorageChange = () => {
      const newIdUser = getIdUser();
      if (newIdUser !== idUser) {
        setIdUser(newIdUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [idUser]);

  useEffect(() => {
    fetchData();
  }, [idUser]);

  const fetchData = async () => {
    if (!idUser) return;

    try {
      setLoading(true);
      const response = await fetch(`http://185.209.230.19:8080/task?idUser=${idUser}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setItem(data);
      // Guardar en localStorage para manejar eliminaciones locales, falta impl en backend
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  //Función para persistir los datos en mi backend
  const saveItem = async (newTask) => {
    try {
      //const idUser = "1";
      const taskToSave = {
        idUser: idUser,
        description: newTask.description,
        status: "PEN"
      };

      const response = await fetch('http://185.209.230.19:8080/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToSave),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedTask = await response.json();
      const updatedItems = [...item, savedTask];
      setItem(updatedItems);
      // Actualizar localStorage
      localStorage.setItem(key, JSON.stringify(updatedItems));
    } catch (error) {
      setError(error.message);
      console.error("Error al guardar la Tarea:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const taskToUpdate = item.find(task => task.id === taskId);
      if (!taskToUpdate) throw new Error('Tarea no encontrada');
  
      const response = await fetch(`http://185.209.230.19:8080/task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: taskId,
          idUser: taskToUpdate.idUser,
          description: taskToUpdate.description,
          status: newStatus
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // El backend no devuelve la tarea actualizada, así que  se actualiza localmente
      const updatedTask = { ...taskToUpdate, status: newStatus };
      const updatedItems = item.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
      setItem(updatedItems);
      localStorage.setItem(key, JSON.stringify(updatedItems));
  
      console.log('Tarea actualizada exitosamente');
    } catch (error) {
      setError(error.message);
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  //test
  // const deleteItemLocally = (taskId) => {
  //   const updatedItems = item.filter(task => task.id !== taskId);
  //   setItem(updatedItems);
  //   localStorage.setItem(key, JSON.stringify(updatedItems));
  // };

  const deleteItemLocally = (id) => {
    setItem(prevItems => 
      prevItems.map(task => 
        task.id === id ? { ...task, status: "CAN" } : task
      )
    );
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getActiveTasks = () => {
    return item.filter(task => task.status === "COM" || task.status === "PEN");
  };
  
  return {item, saveItem, updateTaskStatus, deleteItemLocally, getActiveTasks, loading, error, idUser};
}

export { useBackendStorage };

// localStorage.removeItem('TASKS_V1');

// const arrayTask = [
//   {text: 'Hola amigo', completed: true },
//   {text: 'Como estas', completed: false },
//   {text: 'Este es', completed: true },
//   {text: 'Un test', completed: false },
//   {text: 'New', completed: true },
// ];
// localStorage.setItem('TASKS_V1', JSON.stringify(arrayTask));
