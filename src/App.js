import React, { useState, useReducer, useEffect } from 'react'
import TodoList from './components/TodoList'

const ACTIONS = {
  ADD_TODO: "add-todo"
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.id, action.payload.name)]
    default:
      return todos
  }
}

function newTodo(id, name) {
  return { id: id, name: name, complete: false }
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos'))
    data && data.forEach(item => {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { id: item.id, name: item.name} })
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { id: Date.now(), name: name } })
    setName('')
  }

  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </form>
      </>

      <>
        <TodoList todos={todos} />
      </>
    </>
  )
}
