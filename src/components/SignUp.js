import React, { useState } from "react";
import "../Styles/Signup.css";

function SignUp({ signUp }) {
  const [data, setData] = useState(() => {});

  function handleInputChange({ target: { name, value } }) {
    setData({ ...data, [name]: value });
  }

  function submitForm() {
    signUp(data.email, data.password, data.phone, data.name);
  }

  return (
    <>
      <div className="text-center mt-4">
        <h3 className="text-success">Register Account</h3>
      </div>
      <div className="form">
        <div className="mb-3">
          <strong>Name: </strong>
          <input
            onChange={handleInputChange}
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter full name"
          />
        </div>
        <div className="mb-3">
          <strong>Email:</strong>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <strong>Phone:</strong>
          <input
            onChange={handleInputChange}
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone number"
          />
        </div>
        <div className="mb-3">
          <strong>Password:</strong>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="text-center">
          <button className="btn btn-success" onClick={submitForm}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
