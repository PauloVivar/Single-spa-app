import React from 'react';
import { TaskContext }from '../../Context/TaskContext';

import './TaskSearch.css';

function TaskSearch() {

  const {
    searchValue,
    setSearchValue,
  } = React.useContext(TaskContext);

  return (
    <input className='TaskSearch' placeholder='Busca una tarea'
      value={ searchValue }
      onChange={ (event)=> {
        setSearchValue(event.target.value);
      } }/>
  );
}

export { TaskSearch };