import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [input, setInput] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Ask notification permission once
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Check reminders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16);

      todos.forEach((todo) => {
        if (
          todo.reminder &&
          todo.reminder === now &&
          !todo.completed
        ) {
          new Notification("⏰ Reminder", {
            body: todo.text,
          });
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      reminder: reminderTime || null,
    };

    setTodos([...todos, newTodo]);
    setInput("");
    setReminderTime("");
  };

  const deleteTodo = (id) => {
    const removed = todos.find((t) => t.id === id);
    setDeletedTodos([...deletedTodos, removed]);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "completed"
      ? todos.filter((t) => t.completed)
      : deletedTodos;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="header">
        <h1>Advanced Todo</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀" : "🌙"}
        </button>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <input
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("deleted")}>Deleted</button>
      </div>

      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
        isDeletedView={filter === "deleted"}
      />
    </div>
  );
}

export default App;