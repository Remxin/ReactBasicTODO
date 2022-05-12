import React, { FC, ChangeEvent, useState, useRef, MutableRefObject } from 'react'; // importujemy nowy typ - Functional Component
import { ITask } from './Interfaces';
import TodoTask from './components/TodoTask';
import './App.css';

const App: FC = () => { // nasz app jest własnie komponentem funkcjowym

  // const [task, setTask] = useState<string>("");
  const taskRef = useRef() as MutableRefObject<HTMLInputElement>  // typ to HTML[nazwa elementu z dużej litery]Element
  const [deadline, setDeadline] = useState<number>(0); // próba na 2 sposoby, by się tego nauczyć
  const [todoList, setTodoList] = useState<ITask[]>([]);

  // console.log(taskRef.current.value)
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDeadline(+event.target.value)
  }

  const addTask = (): void => {
    const newTask = { taskName: taskRef.current.value, deadline: deadline }
    setTodoList([...todoList, newTask])

    setDeadline(0)
    taskRef.current.value = ""
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  }


  return (
    <div className="App">
      <div className="header">
        <div className="input-container">
          <input type="text" placeholder="Task..." ref={taskRef} name="task" />
          <input type="number" placeholder="Deadline (in Days)..." onChange={handleChange} name="deadline" value={deadline} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todo-list">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
