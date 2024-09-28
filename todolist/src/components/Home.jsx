import { useState, useEffect } from "react";
import Createtodo from "./Createtodo";
import axios from "axios";
import { FaCircle, FaTrash } from "react-icons/fa";
import { FETCH_STATUS } from "./fetchStatus";
import { Oval } from 'react-loader-spinner'

//timeOut for loading delay..
//const wait = (ms) => new Promise((rs) => setTimeout(rs,ms));

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const url = "http://localhost:3000/api/todos";

  useEffect(() => {
    async function fetchData() {
      setStatus(FETCH_STATUS.LOADING);
      const todos = await axios.get(url);
      // await wait(1000)
      setTodoList(todos.data);
      setStatus(FETCH_STATUS.SUCCESS);
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(url + "/" + id)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleTaskUpdate = (id, done) => {
    axios
      .put(`${url}/${id}?done=${done}`)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h1>Create Todos</h1>
      <Createtodo />
      <br />
      {todoList.length === 0 ? (
        <div>
          {status === "loading" ? (
            <Oval
            visible={true}
            height="40"
            width="40"
            color="#000000"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
          ) : (
            <h2>No tasks to do</h2>
          )}
        </div>
      ) : (
        <ul>
          {todoList.map((todo) => {
            return (
              <li className="todo" key={todo._id}>
                <div>
                  {todo.done ? (
                    <FaCircle
                      className="green"
                      onClick={() => handleTaskUpdate(todo._id, !todo.done)}
                    />
                  ) : (
                    <FaCircle
                      className="red"
                      onClick={() => handleTaskUpdate(todo._id, !todo.done)}
                    />
                  )}
                  <h2 className={todo.done ? "line-through" : ""}>
                    {todo.task}
                  </h2>
                  <FaTrash onClick={() => handleDelete(todo._id)} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
