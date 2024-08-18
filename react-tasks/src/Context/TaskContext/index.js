import React from "react";
import { useBackendStorage } from './useBackendStorage';

const TaskContext = React.createContext();

function TaskProvider({children}){
  //GlobarContext de Tareas donde guardamos toda la lógica para todos nuestros componentes

  const {
    item: tasks, 
    saveItem: saveTasks,
    updateTaskStatus,
    deleteItemLocally,
    getActiveTasks,
    loading,
    error
  } = useBackendStorage('TASKS_V1', []);

  //estado Search
  const [searchValue, setSearchValue] = React.useState('');
  //console.log(searchValue);

  //estado Modal
  const [openModal, setOpenModal] = React.useState(false);

  //Validar cuantas tareas estan completadas
  const activeTasks = getActiveTasks();
  const totalTasks = activeTasks.length;
  const completedTasks = activeTasks.filter(task => task.status === "COM").length;

  //Buscar tarea
  const searchTasks = getActiveTasks().filter(task =>
    task.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  //Función con la lógica para Agregar una nueva tareas
  const addTask = async (description) => {
    await saveTasks({ description });
  };

  //Función con la lógica para Señalar y Quitar tareas existentes
  const completeTask = async (id) => {
    await updateTaskStatus(id, "COM");
  };

  const uncompleteTask = async (id) => {
    await updateTaskStatus(id, "PEN");
  };

  //Función con la lógica para eliminar tareas existentes
  // const deleteTask = (id) => {
  //   deleteItemLocally(id);
  // };
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://185.209.230.19:8080/task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: "CAN"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      deleteItemLocally(id);
    } catch (error) {
      setError(error.message);
      console.error("Error al cancelar la tarea:", error);
    }
  };

  return(
    <TaskContext.Provider value={{
      loading,
      error,
      completedTasks,
      totalTasks,
      searchValue,
      setSearchValue,
      searchTasks,
      addTask,
      completeTask,
      uncompleteTask,
      deleteTask,
      getActiveTasks,
      openModal,
      setOpenModal
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };