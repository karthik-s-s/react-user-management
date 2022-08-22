import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Adduser() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();


  async function registerUser(event) {
    event.preventDefault();
    const responce = await fetch("http://localhost:9000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, 
        email,
        password,
      }),
    });
    const data = await responce.json();
    if(data.status === 'ok')
    navigate('/admin-home')
    
  }
  return (
   
  <div>
  <div className="Auth-form-container">
    <form onSubmit={registerUser} className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign Up</h3>



        <label>User Name</label>

        <div className="form-group mt-3">


          <input class="m-2"
        value={name}
        onChange={(e) => setname(e.target.value)}
        type="text"
        placeholder="Name"
        required />
        </div>
        <label> Email Address</label>

        <div className="form-group mt-3">


          <input class="m-2"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        type="email"
        placeholder="Email"
        required />
        </div>

        <label>Password</label>

        <div className="form-group mt-3">


          <input class="m-2"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        type="password"
        placeholder="Password"
        required />
        </div>




      </div>
      <br />
      <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      </div>

  </div>
  );
}

export default Adduser;
