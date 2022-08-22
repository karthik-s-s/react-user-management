import React from "react";
import { useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
//jQuery libraries

import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { data } from "jquery";
import { useState, useContext } from "react";
import { Mycontext } from "../../comtext/UserContext";

function Ahome() {
  const [list, setlist] = useState([]);
  const [data, setdata] = useState();
  const navigate = useNavigate();
  const { user, setuser } = useContext(Mycontext);

  useEffect(() => {
    displayUsers();
  }, [data]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login", { replace: true });
  };

  const displayUsers = async () => {
    const res = await fetch("http://localhost:9000/users-list");
    console.log(res);
    const allUser = await res.json();

    setlist(allUser);
  };

  const deleteId = async (userId) => {
    await fetch(`http://localhost:9000/delete-user/${userId}`).then(
      (responce) => {
        setdata("deleted");
      }
    );
  };

  const editId = async (userId) => {
    fetch(`http://localhost:9000/edit-user/${userId}`)
      .then((responce) => {
        setdata("edited");
        return responce.json();
      })
      .then((res) => (setuser(res.user), navigate("/edit-user")));
  };

  //initialize datatable
  $(document).ready(function() {
    setTimeout(function() {
      $("#example").DataTable();
    }, 1000);
  });

  return (
    <div>
      {list && (
        <div>
          <h1>Admin home</h1>
          <div className="MainDiv">
            
            <div class="jumbotron text-center"></div>

            <div className="container">
              <hr />
              <table id="example" class="table table-hover table-bordered">
                <thead>
                 
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((result, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{result.email}</td>
                        <td>{result.name}</td>
                        <td>
                          <a
                            onClick={() => deleteId(result._id)}
                            class="btn btn-danger m-1"
                          >
                            Delete
                          </a>
                          <a
                            onClick={() => editId(result._id)}
                            class="btn btn-primary"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div class = "float-end">
  
                  <a
                    onClick={() => navigate("/add-user")}
                    class="btn btn-primary m-1 "
                  >
                    Add user
                  </a>
                  <a onClick={() => setdata("refresh")} class="btn btn-primary m-1">
                    refresh
                  </a>
                  <a onClick={() => logout()} class="btn btn-primary m-1">
                    Log out
                  </a>
               </div>
            </div>
            
          </div>
          
        </div>
      )}
      
    </div>
  );
}

export default Ahome;
