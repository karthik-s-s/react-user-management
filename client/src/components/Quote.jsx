import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
function Quote() {
  const [quote, setquote] = useState("");
  const [tempquote, settempquote] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    async function populatequote() {
      const req = await fetch("http://localhost:9000/quote", {
        headers: {
          "x-access-token": localStorage.getItem("token"), //instead of cookies xaccess token
        },
      });
      const data =await req.json();
      if(data.status === 'ok'){
        setquote(data.quote)
      }else{
        alert(data.error)
      }
    }

    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } else {
        populatequote();
      }
    }
  },[]);
  const logout = ()=>{
    localStorage.removeItem("token");
        navigate("/", { replace: true });
  }
  async function updateQuote(event) {
    event.preventDefault()
    const req = await fetch("http://localhost:9000/quote", {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
        "x-access-token": localStorage.getItem("token"), //instead of cookies xaccess token
      },
      body:JSON.stringify({
        quote:tempquote
      })
    });
    const data =await req.json();
    if(data.status === 'ok'){
      settempquote('')
      setquote(tempquote)
    }else{
      alert(data.error)
    }
    console.log(data);
  }
  return (
    <div class= "position-absolute top-50 start-50 translate-middle " >

      <h1 >Your Quote:{quote || "no Quote found"}</h1>
      <br />
      <form onSubmit={updateQuote}>
        <input class="m-2 border border-2" type="text" placeholder="Quote" value={tempquote}   onChange= {(e)=>settempquote(e.target.value)}/>
        <input type="submit" value="Update quote" />
      </form>
      <a onClick={()=>logout()} class="btn btn-primary">Log out</a>

    </div>
  );
}

export default Quote;
