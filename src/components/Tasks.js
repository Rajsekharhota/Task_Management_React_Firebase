import React, { useState, useEffect } from "react";
import { app, database } from "../Firebase/firebase.config";
import { set, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../Styles/Tasks.css";

function generateUniqueID(num) {
  let chars = "mnbvcxzasdfghjklqwertpoiuy0987612345";
  let str = "";
  for (let i = 0; i < chars.length; i++) {
    let index = Math.floor(Math.random() * chars.length);
    str += chars[index];
  }

  return str;
}

function TodoInput({ edit_todo, setEditTodo }) {
  const [data, setData] = useState(() => ({ complete: false }));

  const [user, setUser] = useState({ active: false, user: null });

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(
      auth,
      function (user) {
        if (user) setUser({ active: true, user });
      },
      (error) => {
        alert("Something went wrong");
        console.error(error);
      }
    );
  }, [auth]);

  function handleInputChange({ target: { name, value } }) {
    setData({ ...data, [name]: value });
  }

  async function addStuff() {
    try {
      const created_ref = ref(database, "task/" + generateUniqueID(10));
      await set(created_ref, { ...data, uid: user.user?.uid });
      alert("Task added");
      setData({ title: "", description: "", stuff_on: "" });
    } catch (error) {
      alert("Something wrong...");
      console.error(error.message);
    }
  }

  return (
    <div className="todo-input-container">
      <h4 className="text-success">Enter Your Task </h4>
      <div>
        <p>Enter Todo title</p>
        <input
          onChange={handleInputChange}
          type="text"
          name="title"
          placeholder="Enter title"
        />
        <p>Enter Todo description</p>
        <textarea
          onChange={handleInputChange}
          name="description"
          placeholder="Enter description"
        />
        <br />
        <p>Task perform date</p>
        <input
          onChange={handleInputChange}
          type="date"
          name="stuff_on"
          placeholder="Stuff perform on"
        />
        <div>
          <button onClick={addStuff}>Add Stuff</button>
        </div>
      </div>
    </div>
  );
}

export default TodoInput;
