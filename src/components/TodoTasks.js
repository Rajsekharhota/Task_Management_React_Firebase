// import React, { useEffect, useState } from "react";
// import { database } from "../Firebase/firebase.config";
// import { ref, onValue, remove } from "firebase/database";
// import { FaTrash, FaPen } from "react-icons/fa";

// function TodoTasks({ uid, editTodo }) {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     const todo_ref = ref(database, "task/");
//     onValue(todo_ref, (snapshot) => {
//       const data = snapshot.val();
//       let todosArray = [];
//       for (let key in data) {
//         todosArray.push({ ...data[key], todo_id: key }); // Use unique key (todo_id)
//       }
//       todosArray = todosArray.filter((todo) => todo.uid === uid);
//       setTodos(todosArray);
//     });
//   }, [uid]);

//   function deleteStuff(id) {
//     const todo_ref = ref(database, "todo/" + id);
//     remove(todo_ref);

//     let filter_todos = todos.filter((todo) => todo.todo_id !== id);
//     setTodos(filter_todos);
//   }

//   function editTask(task) {
//     // Call the editTodo function to set the task for editing in the Home component
//     editTodo(task);
//   }

//   return (
//     <div style={{ width: "50%", maxWidth: "300px" }}>
//       <h4>TodoTasks</h4>
//       {todos.length > 0 ? (
//         todos.map((todo) => (
//           <details key={todo.todo_id} style={{ margin: "10px 0" }}>
//             <span style={{ fontSize: "0.9rem" }}>
//               <i>
//                 Scheduled For {new Date(todo.stuff_on).toLocaleDateString()}
//               </i>
//             </span>
//             <summary>{todo.title}</summary>
//             <p>{todo.description}</p>
//             <div>
//               <button onClick={() => deleteStuff(todo.todo_id)}>
//                 <FaTrash /> Delete
//               </button>

//               <button value={todo.todo_id} onClick={() => editTask(todo)}>
//                 <FaPen /> Edit
//               </button>
//             </div>
//           </details>
//         ))
//       ) : (
//         <p>Empty bucket</p>
//       )}
//     </div>
//   );
// }
// export default TodoTasks;

import React, { useEffect, useState } from "react";
import { database } from "../Firebase/firebase.config";
import { ref, onValue, remove, update } from "firebase/database";
import { FaTrash, FaPen } from "react-icons/fa";
import "../Styles/Todotasks.css";

function TodoTasks({ uid }) {
  const [todos, setTodos] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const todo_ref = ref(database, "task/");
    onValue(todo_ref, (snapshot) => {
      const data = snapshot.val();
      const todosArray = [];
      for (let key in data) {
        todosArray.push({ ...data[key], todo_id: key });
      }
      const userTodos = todosArray.filter((todo) => todo.uid === uid);
      setTodos(userTodos);
    });
  }, [uid]);

  function deleteStuff(id) {
    const todo_ref = ref(database, `task/${id}`);
    remove(todo_ref);

    const updatedTodos = todos.filter((todo) => todo.todo_id !== id);
    setTodos(updatedTodos);
  }

  function editTask(task) {
    // Set the task to be edited in the state
    setEditedTask({ ...task });
  }

  function saveEditedTask() {
    // Update the task within the state
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === editedTask.todo_id ? editedTask : todo
    );
    setTodos(updatedTodos);

    // Update the task in the Firebase Realtime Database
    const todo_ref = ref(database, `task/${editedTask.todo_id}`);
    update(todo_ref, editedTask);

    // Clear the editedTask state
    setEditedTask(null);
  }

  return (
    <div className="todo-tasks-container">
      <h4 className="text-danger">Todo Tasks</h4>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo.todo_id}
            style={{ margin: "10px 0" }}
            className="todo-item"
          >
            <span className="scheduled-date" style={{ fontSize: "0.9rem" }}>
              <i>
                Scheduled For {new Date(todo.stuff_on).toLocaleDateString()}
              </i>
            </span>
            {editedTask && editedTask.todo_id === todo.todo_id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
                <textarea
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                />
                <button className="save-button" onClick={saveEditedTask}>
                  <FaPen /> Save
                </button>
              </div>
            ) : (
              <div className="task-details">
                <strong>{todo.title}</strong>
                <p>{todo.description}</p>
                <button
                  className="btn btn-warning p-2 m-2 w-100"
                  onClick={() => editTask(todo)}
                >
                  <FaPen /> Edit
                </button>
              </div>
            )}
            <button
              className="btn btn-danger p-2 m-2 w-100"
              onClick={() => deleteStuff(todo.todo_id)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))
      ) : (
        <p className="empty-message">Empty bucket</p>
      )}
    </div>
  );
}

export default TodoTasks;
