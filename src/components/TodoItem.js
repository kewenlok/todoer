import React from 'react'
import { ACTIONS } from '../App.js'

export default function TodoItem({ todo, dispatch }) {
    function handleToggleClick() {
        dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
    }

    function handleDeleteClick() {
        dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
    }

    return (
        <div>
            <span style={{ color: todo.complete ? 'green' : 'yellow' }}>
                {new Date(todo.id).toDateString()} - {todo.name}
            </span>
            <button onClick={handleToggleClick}>Toggle</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}
