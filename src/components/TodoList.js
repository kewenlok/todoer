import React from 'react'
import TodoItem from './TodoItem.js'

export default function TodoList({ todos, dispatch }) {
    return (
        <div>
        {todos.map((todo) =>
            <TodoItem key={todo.id.toString()}
                    todo={todo} dispatch={dispatch} />
        )}
        </div>
    )
}
