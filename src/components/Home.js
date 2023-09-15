import React, { useState } from "react";
import "../Styles/Home.css";
import TodoInput from "./Tasks";
import TodoTasks from "./TodoTasks";

function Home({ user: { user }, email, signOut }) {
  const [edit_todo, setEditTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  function editTodo(editedTask) {
    // Update the state with the edited task
    // You can use map to update the specific task within the todos array
    const updatedTodos = todos.map((todo) => {
      if (todo.todo_id === editedTask.todo_id) {
        return editedTask;
      }
      return todo;
    });

    // Set the updated todos array
    setTodos(updatedTodos);

    // Reset the edit_todo state
    setEditTodo(null);
  }

  return (
    <div className="home-container">
      <h3>Welcome to Task Management {email}</h3>
      <button className="sign-out-button" onClick={signOut}>
        Sign Out
      </button>

      <div className="todo-container">
        <TodoInput edit_todo={edit_todo} setEditTodo={setEditTodo} />
        <TodoTasks uid={user?.uid} editTodo={editTodo} />
      </div>
    </div>
  );
}

export default Home;
