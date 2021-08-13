import React, { useState, useReducer, useEffect } from 'react'
import TodoList from './components/TodoList.js'

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo"
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.id, action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    default:
      return null
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
        <TodoList todos={todos} dispatch={dispatch} />
      </>
    </>
  )
}
