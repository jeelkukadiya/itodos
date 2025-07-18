import React from 'react'

const Navbar = () => {
    // Scroll handlers
    const handleHomeClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleTasksClick = () => {
        const el = document.getElementById('your-todos-section');
        if (el) {
            el.scrollIntoView({ top:0, behavior: 'smooth' });
        }
    };
    return (
        <nav className='sticky top-0 z-50 flex justify-between items-center bg-white dark:bg-gray-900 shadow px-4 sm:px-8 py-3 rounded-b-xl transition-colors duration-300'>
            <div className="logo">
                <span className='font-extrabold text-2xl text-indigo-700 dark:text-indigo-300 tracking-tight'>iToDo</span>
            </div>
            <ul className="flex gap-4 sm:gap-8 items-center">
                <li onClick={handleHomeClick} className='cursor-pointer font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition'>Home</li>
                <li onClick={handleTasksClick} className='cursor-pointer font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar