// src/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList({ idUser = 1 }) {  // Añadimos idUser como prop con valor por defecto 1
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Usamos el parámetro idUser en la URL de la API
    axios.get(`http://185.209.230.19:8080/task?idUser=${idUser}`)
      .then(response => {
        console.log(response.data);
        
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, [idUser]);  // Añadimos idUser como dependencia del efecto

  return (
    <div>
      <h2>Tareas para el usuario {idUser}</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;