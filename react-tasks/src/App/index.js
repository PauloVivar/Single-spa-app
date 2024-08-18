import React from 'react';
import { AppUI } from './AppUI';
import { TaskProvider } from '../Context/TaskContext';

function App() {
  
  return(
    <TaskProvider>
      <AppUI />
    </TaskProvider>
    
  );
}

export default App;
