import React, { useState } from 'react';

function TodoForm({ onAdd, editData = null, onCancel = null }) {
  const [text, setText] = useState(editData?.text || '');
  const [deadline, setDeadline] = useState(editData?.deadline || '');
  const [priority, setPriority] = useState(editData?.priority || 'medium');
  const [category, setCategory] = useState(editData?.category || 'personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    const todoData = {
      text: text.trim(),
      deadline: deadline || null,
      priority,
      category
    };

    onAdd(todoData);

    // Reset form if not editing
    if (!editData) {
      setText('');
      setDeadline('');
      setPriority('medium');
      setCategory('personal');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Task description..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editData ? 'Update Task' : 'Add Task'}
        </button>
        {editData && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;