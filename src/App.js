import { app } from "./Firebase/firebase.config";
import {
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

function App() {
  const auth = getAuth(app);

  const [component, switchComponent] = useState(() => "signin");
  const [user, setUser] = useState(() => ({ active: false, user: null }));

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

  async function signIn(username, password) {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      setUser({ active: true, user: credential.user });
    } catch (error) {
      console.error(error.message);
    }
  }

  async function signUp(username, password, phoneNumber, displayName) {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      await updateProfile(auth.currentUser, {
        phoneNumber,
        displayName,
      });

      alert(`Account created for ${credential.user.email}`);
      setUser({ active: true, user: credential.user });
    } catch (error) {
      console.error(error.message);
    }
  }

  async function logOut() {
    await signOut(auth);
    setUser({ active: false, user: null });
  }

  if (user.active === true) {
    return <Home user={user} signOut={logOut} />;
  }

  return (
    <div className="app-container">
      <div className="d-flex justify-content-between p-3 bg-dark">
        <div>
          <h2 className="text-success"> Your Task Manager</h2>{" "}
        </div>
        <div>
          <button
            className="btn btn-primary p-2 m-2"
            onClick={() => switchComponent("signin")}
          >
            SignIn
          </button>
          &nbsp;
          <button
            className="btn btn-success p-2 m-2"
            onClick={() => switchComponent("signup")}
          >
            SignUp
          </button>
        </div>
      </div>
      {component === "signin" ? (
        <SignIn signIn={signIn} />
      ) : (
        <SignUp signUp={signUp} />
      )}
    </div>
  );
}

export default App;
