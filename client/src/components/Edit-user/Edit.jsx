import React, { useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../comtext/UserContext";
function Edit() {
  const {user} = useContext(Mycontext)
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user)
    setname(user.name)
    setemail(user.email)
    setpassword(user.password)   
  }, [])
  
  
  async function updateUser(event) {
    event.preventDefault();
    
fetch(`http://localhost:9000/update-user/${user._id}`, {
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
    
    
    
    
    navigate('/admin-home')
  }
  return (

    <div>

      { user &&(
        <div>
          <div className="Auth-form-container">
      <form onSubmit={updateUser} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Update</h3>
     
      <div className="form-group mt-3">
            <label>Update User Name </label>
            

            <input
        class = "m-4"
          value={name}
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="User name"
          required
        />  
          </div>

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
         
         
          

          <input type="submit" class="btn btn-primary" value="Update" />
          </div>
        </form>
        </div>
        </div>
      )}
      
      
    </div>
  );
}

export default Edit;
