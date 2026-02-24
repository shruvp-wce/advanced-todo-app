import React, { useState } from "react";

function TodoList({
  todos,
  deleteTodo,
  toggleComplete,
  updateTodo,
  isDeletedView,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const saveEdit = (id) => {
    updateTodo(id, editText);
    setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-msg">No tasks here 🚀</p>
      ) : (
        todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <input
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                autoFocus
              />
            ) : (
              <>
                {!isDeletedView && (
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                )}

                <span
                  className={todo.completed ? "completed" : ""}
                >
                  {todo.text}
                </span>
              </>
            )}

            {!isDeletedView && (
              <div className="btn-group">
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}
                >
                  ✏
                </button>
                <button onClick={() => deleteTodo(todo.id)}>✕</button>
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  );
}

export default TodoList;