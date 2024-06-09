import React from "react";
import { useState } from "react"

const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
    // const signup = async (id) => {
    //     try {
    //       const response = await fetch(`http://localhost:8000/api/user/${id}`, {
    //         method: "POST",
    //       })
    //       if (response.ok) {
    //         // setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
    //       } else {
    //         const json = await response.json();
    //         throw new Error(json.error);
    //       }
    //     } catch (error) {
    //       console.error("Error deleting workout:", error);
    //     }
    // }
    // signup()
  }


  return (
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        
        <h3>Sign up</h3>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Singup;
