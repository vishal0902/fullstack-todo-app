import React, { useState, useEffect } from "react";
import InputBox from "../ui/InputBox";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export default function Dashboard() {
  const navigate = useNavigate();
  // const [userData, setUserData] = useState({})
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoAdded, setTodoAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todoDone, setTodoDone] = useState(false);
  const [addTodoLoader, setAddTodoLoader] = useState(false)

  const getTodos = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/user/getUserData",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response.data.userData);
        setTodos(response.data.userData.todos);
        setFirstName(response.data.userData.firstName);
        setLastName(response.data.userData.lastName);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/signin");
      });
  };

  useEffect(() => {
    getTodos();
  }, [todoAdded, todoDone]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const navigate = useNavigate()

  const addTodo = async () => {
    
    setAddTodoLoader(true)
    
    await axios
      .post(
        "http://localhost:3000/api/v1/todo/add",
        {
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setTodoAdded((prev) => !prev);
        setTitle("");
        setDescription("");
        setAddTodoLoader(false)

      });
    // console.log(response.data)
  };

  return (
    <>
      {!loading && (
        <div className="grid grid-cols-1 md:relative sticky">
          <div className="grid grid-cols-2 md:grid-cols-3 justify-between  py-5 bg-gray-900  text-white ">
            <div className="flex justify-start pl-2 col-span-1">
              <Heading text="Todoosh" />
            </div>

            <div className="md:block hidden col-span-1 text-2xl text-center text-teal-500">
              hello, {firstName} {lastName}
            </div>

            <div className="flex justify-end">
              <div className="hover:text-teal-300 hover:bg-gray-700 p-3 mr-3 cursor-pointer rounded-full flex justify-center bg-gray-600 text-teal-500">
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/signin");
                  }}
                  className="">
                  Signout
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 ">
            <div className="col-span-1 border-r ">
              <AddTodo
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={setDescription}
                addTodo={addTodo}
                addTodoLoader={addTodoLoader}
                setAddTodoLoader={setAddTodoLoader}
              />
            </div>
            <div className="col-span-1  ">
              <TodoList todos={todos} setTodoDone={setTodoDone} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
