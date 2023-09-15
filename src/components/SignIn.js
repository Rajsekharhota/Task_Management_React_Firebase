// import React, { useState } from "react";
// import "../Styles/Signin.css";

// function SignIn({ UserSignIn }) {
//   const [data, setData] = useState(() => {});

//   function handleInputChange({ target: { name, value } }) {
//     setData({ ...data, [name]: value });
//   }

//   function submitForm() {
//     UserSignIn(data.userEmail, data.userPassword);
//   }

//   return (
//     <>
//       <form className="form">
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="InputEmail"
//             name="userEmail"
//             aria-describedby="email"
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             name="userPassword"
//             className="form-control"
//             id="InputPassword"
//             onChange={handleInputChange}
//             autoComplete="on"
//           />
//         </div>
//         <div className="text-center">
//           <button
//             type="submit"
//             className="btn btn-primary"
//             onChange={submitForm}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }

// export default SignIn;

import React, { useState } from "react";
import "../Styles/Signin.css";

function SignIn({ signIn }) {
  const [data, setData] = useState(() => {});

  function handleInputChange({ target: { name, value } }) {
    setData({ ...data, [name]: value });
  }

  function submitForm() {
    signIn(data.username, data.password, data.phoneNumber);
  }

  return (
    <>
      <div className="text-center mt-4">
        <h3 className="text-primary">Login To Your Account</h3>
      </div>
      <div className="form">
        <div className="mb-3">
          <input
            onChange={handleInputChange}
            type="email"
            name="username"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="text-center">
          <button onClick={submitForm}>Login</button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
