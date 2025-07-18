import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  showFinished,
  categoryFilter,
  priorityFilter,
  searchText,
  handleCheckbox,
  handleEdit,
  handleDelete
}) => {
  // Filtering and sorting logic
  const filteredTodos = todos
    .filter(item => categoryFilter === "All" || item.category === categoryFilter)
    .filter(item => priorityFilter === "All" || item.priority === priorityFilter)
    .filter(item => item.todo.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .filter(item => showFinished || !item.isCompleted);

  return (
    <div className="todos">
      {filteredTodos.length === 0 && (
        <div className='m-5 text-gray-400 dark:text-gray-500 text-center'>No Todos To Display</div>
      )}
      {filteredTodos.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          handleCheckbox={handleCheckbox}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList; 