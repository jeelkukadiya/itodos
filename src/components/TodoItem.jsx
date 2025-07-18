import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

const TodoItem = ({
  item,
  handleCheckbox,
  handleEdit,
  handleDelete,
  isMobile
}) => (
  <div className="todo w-full max-w-3xl bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm my-3 mx-auto transition-colors duration-300">
    {/* Desktop: single row; Mobile: badges below */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' className="accent-indigo-600 dark:accent-indigo-400 w-5 h-5" />
        <span className={`break-words flex-1 min-w-0 text-base ${item.isCompleted ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-100"}`}>{item.todo}</span>
        {/* Badges: inline on desktop, hidden on mobile */}
        <div className="hidden sm:flex gap-2">
          {item.dueDate && (
            <span className="px-2 py-1 text-xs rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold">Due: {item.dueDate}</span>
          )}
          {item.category && (
            <span className={`px-2 py-1 text-xs rounded font-semibold 
              ${item.category === 'Work' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : ''}
              ${item.category === 'Personal' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' : ''}
              ${item.category === 'Urgent' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' : ''}
              ${item.category === 'Other' ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200' : ''}
            `}>{item.category}</span>
          )}
          {item.priority && (
            <span className={`px-2 py-1 text-xs rounded font-semibold 
              ${item.priority === 'High' ? 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200' : ''}
              ${item.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : ''}
              ${item.priority === 'Low' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : ''}
            `}>{item.priority} Priority</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 ml-2 mt-2 sm:mt-0 sm:flex">
        <button onClick={e => handleEdit(e, item.id)} className="edit bg-indigo-500 hover:bg-indigo-700 p-2 text-white rounded-md shadow transition cursor-pointer hidden sm:inline-flex"><FaEdit/></button>
        <button onClick={e => handleDelete(e, item.id)} className="delete bg-red-500 hover:bg-red-700 p-2 text-white rounded-md shadow transition cursor-pointer hidden sm:inline-flex"><AiFillDelete/></button>
      </div>
    </div>
    {/* Badges and buttons: only on mobile, below */}
    <div className="flex sm:hidden justify-between items-center gap-2 mt-2 min-h-[2.25rem]">
      <div className="flex gap-2 items-center">
        {item.dueDate && (
          <span className="px-2 py-1 text-xs rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold">Due: {item.dueDate}</span>
        )}
        {item.category && (
          <span className={`px-2 py-1 text-xs rounded font-semibold 
            ${item.category === 'Work' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : ''}
            ${item.category === 'Personal' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' : ''}
            ${item.category === 'Urgent' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' : ''}
            ${item.category === 'Other' ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200' : ''}
          `}>{item.category}</span>
        )}
        {item.priority && (
          <span className={`px-2 py-1 text-xs rounded font-semibold 
            ${item.priority === 'High' ? 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200' : ''}
            ${item.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : ''}
            ${item.priority === 'Low' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : ''}
          `}>{item.priority} Priority</span>
        )}
      </div>
      <div className="flex gap-2">
        <button onClick={e => handleEdit(e, item.id)} className="edit bg-indigo-500 hover:bg-indigo-700 p-2 text-white rounded-md shadow transition cursor-pointer"><FaEdit/></button>
        <button onClick={e => handleDelete(e, item.id)} className="delete bg-red-500 hover:bg-red-700 p-2 text-white rounded-md shadow transition cursor-pointer"><AiFillDelete/></button>
      </div>
    </div>
  </div>
);

export default TodoItem; 