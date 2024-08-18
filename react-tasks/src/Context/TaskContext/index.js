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
    loading,
    error
  } = useBackendStorage('TASKS_V1', []);

  //estado Search
  const [searchValue, setSearchValue] = React.useState('');
  //console.log(searchValue);

  //estado Modal
  const [openModal, setOpenModal] = React.useState(false);

  //Validar cuantas tareas estan completadas
  const completedTasks = tasks.filter(
    task => task.status === "COM"
  ).length;
  const totalTasks = tasks.length;

  //Buscar tarea
  const searchTasks = tasks.filter((task) => {
    if (!task || typeof task.description !== 'string') return false;
    const taskText = task.description.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return taskText.includes(searchText);
  });

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
  const deleteTask = (id) => {
    deleteItemLocally(id);
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
      openModal,
      setOpenModal
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };