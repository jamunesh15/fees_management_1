

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded mb-2"
    >
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}

export default ThemeToggle;