
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import  "../login/login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      navigate('/quote')

      if (!user) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } 
    }else{
      navigate("/", { replace: true });

    }
    
   
  }, [])
  

  async function loginUser(event) {
    event.preventDefault();
    const responce = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await responce.json();
    if(data.user){
        localStorage.setItem('token',data.user)
        
        alert("Login success")
        // window.location.href='/quote'
        navigate('/quote')
    }else{
        alert("Login Failed")
    }
  }
  return (
    <div>

<div className="Auth-form-container">
      <form onSubmit={loginUser} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            

            <input
        class = "m-4"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />  
          </div>
          <label>Password</label>

          <div className="form-group mt-3">
            <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
          </div>
          <div className=" mt-3 d-flex justify-content-center">
          <input type="submit" class = "btn btn-primary m-3 " value="Login" />

          </div>
          <p className="forgot-password text-right mt-2">
          <a onClick={()=>navigate('/register')} class="btn btn-outline-primary">signup</a>

          </p>
        </div>
      </form>
    </div>


    </div>
  );
}

export default Login;
