import './TaskButton.css';

function TaskButton({ setOpenModal }) {
  return (
    <button className='TaskButton'
      onClick={ 
        ()=> {
          setOpenModal(state => !state);
        }
      }>
        +
    </button>
  );
}

export { TaskButton };