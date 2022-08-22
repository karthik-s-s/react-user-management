import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";


function Admin_login() {
    const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      navigate('/admin-home')

      if (!user) {
        localStorage.removeItem("token");
        navigate("/admin-login", { replace: true });
      } 
    }else{
      navigate("/admin-login", { replace: true });

    }
   
  }, [])

    async function loginAdmin(event) {
        event.preventDefault();
        const responce = await fetch("http://localhost:9000/adminLogin", {
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
       console.log(data.admin);
        if(data.admin){
            localStorage.setItem('token',data.admin)
            
            alert("Login success")
            navigate('/admin-home')
        }else{
            alert("Login Failed")
        }
    }
       

  return (
    
<div className="Auth-form-container">
      <form onSubmit={loginAdmin} className="Auth-form">
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

  )
}

export default Admin_login