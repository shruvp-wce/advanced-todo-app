import React from 'react';

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button 
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;