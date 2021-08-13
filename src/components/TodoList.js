import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos }) {
    return (
        <ul>
        {todos.map((todo) =>
            <TodoItem key={todo.id.toString()}
                    todo={todo} />
        )}
        </ul>
    )
}
