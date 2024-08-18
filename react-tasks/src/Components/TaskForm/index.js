import React from 'react';
import { TaskContext } from '../../Context/TaskContext';
import './TaskForm.css';

function TaskForm() {
  const {
    addTask,
    setOpenModal,
  } = React.useContext(TaskContext);

  //estado local
  const [newTaskValue, setNewTaskValue] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    addTask(newTaskValue);
    setOpenModal(false);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onChange = (event) => {
    setNewTaskValue(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Esribe tu nueva Tarea</label>
      <textarea
        placeholder="Ingresa una nueva tarea"
        value={newTaskValue}
        onChange={onChange}
      />
      <div className="TaskForm-buttonContainer">
        <button
          type="button"
          className="TaskForm-button TaskForm-button--cancel"
          onClick={onCancel}
        >Cancelar</button>
        <button
          type="submit"
          className="TaskForm-button TaskForm-button--add"
        >Añadir</button>
      </div>
    </form>
  );
}

export { TaskForm };