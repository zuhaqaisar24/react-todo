import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  function addTodo() {
    if (input.trim() === '') return
    setTodos([...todos, { text: input, done: false }])
    setInput('')
  }

  function toggleTodo(index) {
    const updated = [...todos]
    updated[index].done = !updated[index].done
    setTodos(updated)
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const tasksLeft = todos.filter((t) => !t.done).length

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.length > 0 && (
        <p className="task-counter">
          {tasksLeft === 0 ? 'All tasks complete' : `${tasksLeft} task${tasksLeft !== 1 ? 's' : ''} remaining`}
        </p>
      )}

      <ul>
        {todos.length === 0 && (
          <p className="empty-state">No tasks yet. Add one to get started.</p>
        )}

        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(index)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App