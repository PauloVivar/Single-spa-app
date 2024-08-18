import React from 'react';
import { TaskContext } from '../../Context/TaskContext';

import './TaskCounter.css';

function TaskCounter() {
  const {
    completedTasks,
    totalTasks,
  } = React.useContext(TaskContext);
  
  return (
    <h1 className='TaskCounter'>
      Has completado <span>{completedTasks}</span> de <span>{totalTasks}</span> Tareas.
    </h1>
  );
}

export { TaskCounter };