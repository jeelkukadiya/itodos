import { useEffect, useState, useRef } from 'react'
import Navbar from './components/NavBar'
import {v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import TodoList from './components/TodoList';

function App() {

  const [todo, setTodo] = useState("")
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Work");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  // Remove theme/toggle state and always enable dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    // Only load todos from localStorage on mount
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      console.log("Loaded from localStorage:", todoString);
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const inputRef = useRef(null);
  const [editId, setEditId] = useState(null);

  const handelAddOrUpdate = (e) => {
    if (todo.trim().length <= 3) return;
    if (editId) {
      // Update existing todo
      const newTodos = todos.map(item =>
        item.id === editId ? { ...item, todo } : item
      );
      setTodos(newTodos);
      saveToLS(newTodos);
      setEditId(null);
    } else {
      // Add new todo
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false, dueDate, category, priority }];
      setTodos(newTodos);
      saveToLS(newTodos);
    }
    setTodo("");
    setDueDate("");
    setCategory("Work");
    setPriority("Medium");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    setEditId(id);
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(t.todo.length, t.todo.length);
      }, 0);
    }
  };
  const handleDelete =(e, id)=>{
    const newTodos = todos.filter(item=>{
      return item.id!== id
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  }
  const handleChange =(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox =(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  }
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handelAddOrUpdate();
    }
  };
  const toggleFinished = (e)=>{
    setshowFinished(!showFinished); 
  }

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-8 transition-colors duration-300">
        <Navbar />
        <div className="container w-[96vw] max-w-[90vw] sm:max-w-[60vw] mx-auto my-8 rounded-2xl p-2 sm:p-8 bg-white dark:bg-gray-800 shadow-lg min-h-[80vh] transition-colors duration-300">
          <h1 className='font-bold text-2xl text-center text-indigo-700 dark:text-indigo-200 mb-6 tracking-tight'>iTodo - Manage your todos at one place</h1>
          <div className="addTodo my-5 flex flex-col gap-2 sm:gap-4">
            <h2 className='text-lg font-semibold text-gray-700 dark:text-gray-200'>Add a Todo</h2>
            <input
              ref={inputRef}
              onChange={handleChange}
              value={todo}
              onKeyDown={handleInputKeyDown}
              className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 my-1 px-5 py-2 rounded-lg text-gray-800 dark:text-gray-100 transition'
              type="text"
              placeholder="What do you need to do?"
            />
            <input onChange={e => setDueDate(e.target.value)} value={dueDate} type="date" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 my-1 px-5 py-2 rounded-lg text-gray-800 dark:text-gray-100 transition" />
            <div className="flex flex-col sm:flex-row gap-2">
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 px-5 py-2 rounded-lg text-gray-800 dark:text-gray-100 transition">
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Urgent">Urgent</option>
                <option value="Other">Other</option>
              </select>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 px-5 py-2 rounded-lg text-gray-800 dark:text-gray-100 transition">
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
            <button
              onClick={handelAddOrUpdate}
              disabled={todo.length <= 3}
              className="add bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:disabled:bg-indigo-900 p-3 py-2 text-base font-bold text-white rounded-lg shadow transition cursor-pointer disabled:cursor-not-allowed"
            >{editId ? 'Update' : 'Save'}</button>
          </div>
          {/* Show Finished Checkbox */}
          <div className="flex items-center gap-2 mb-2">
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="showFinished" className="accent-indigo-600 dark:accent-indigo-400 w-4 h-4" />
            <label htmlFor="showFinished" className="text-gray-600 dark:text-gray-300 select-none">Show Finished</label>
          </div>
          {/* Category Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label htmlFor="categoryFilter" className="text-gray-600 dark:text-gray-300 select-none">Filter by Category:</label>
              <select id="categoryFilter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 px-3 py-1 rounded-lg text-gray-800 dark:text-gray-100 transition">
                <option value="All">All</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Urgent">Urgent</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="priorityFilter" className="text-gray-600 dark:text-gray-300 select-none">Filter by Priority:</label>
              <select id="priorityFilter" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 px-3 py-1 rounded-lg text-gray-800 dark:text-gray-100 transition">
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <input
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search todos..."
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 px-3 py-1 rounded-lg text-gray-800 dark:text-gray-100 transition w-full sm:w-64"
            />
          </div>
          <h2 id="your-todos-section" className='font-bold text-xl text-gray-800 dark:text-gray-100 mb-2'>Your ToDos</h2>
         <TodoList
           todos={todos}
           showFinished={showFinished}
           categoryFilter={categoryFilter}
           priorityFilter={priorityFilter}
           searchText={searchText}
           handleCheckbox={handleCheckbox}
           handleEdit={handleEdit}
           handleDelete={handleDelete}
         />
        </div>
      </div>
    </>
  )
}

export default App
