import React from 'react';
import { TaskContext } from '../../Context/TaskContext';
import './LogoutButton.css';

function LogoutButton() {
  const { logout } = React.useContext(TaskContext);

  return (
    <button className='LogoutButton' onClick={logout}>
      Cerrar Sesión
    </button>
  );
}

export { LogoutButton };