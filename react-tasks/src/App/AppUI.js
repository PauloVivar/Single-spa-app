
import React from 'react';
import { TaskContext } from '../Context/TaskContext';

import { TaskCounter } from '../Components/TaskCounter';
import { TaskSearch } from '../Components/TaskSearch';
import { TaskList } from '../Components/TaskList';
import { TaskItem } from '../Components/TaskItem';
import { TaskButton } from '../Components/TaskButton';
import { TasksLoading } from '../Components/TasksLoading';
import { TasksError } from '../Components/TasksError';
import { TasksEmpty } from '../Components/TasksEmpty';
import { Modal } from '../Components/Modal';
import { TaskForm } from '../Components/TaskForm';
import { LogoutButton } from '../Components/LogoutButton';

function AppUI() {

  const {
    loading,
    error,
    searchTasks,
    completeTask,
    uncompleteTask,
    deleteTask,
    openModal,
    setOpenModal
  } = React.useContext(TaskContext);

  return (
    <>
      <LogoutButton />
      <TaskCounter />
      <TaskSearch />

      <TaskList>

        {loading && <TasksLoading />}
        {error && <TasksError />}
        {(!loading && searchTasks.length === 0) && <TasksEmpty />}
        
        {searchTasks.map(task => (
          <TaskItem 
            key={task.id}
            text={task.description}
            completed={task.status === "COM"}
            onComplete={() => task.status === "COM" ? uncompleteTask(task.id) : completeTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}

      </TaskList>

      <TaskButton 
        setOpenModal={setOpenModal}/>

      {openModal && (
        <Modal>
          <TaskForm />
        </Modal>
      )}
    
    </>
  );
}

export { AppUI }