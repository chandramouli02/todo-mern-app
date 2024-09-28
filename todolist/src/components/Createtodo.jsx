import { useState } from "react";
import axios from "axios";

function Createtodo() {
  const [task, setTask] = useState("");

  const handleAdd = async () => {
    const url = "http://localhost:3000/api/todos";
    await axios
      .post(url, { task: task, done: false })
      .then(() => {
        location.reload();
      })
      .catch((error) => console.log(error));
    // clears the input area
    setTask("");
  };


  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter a todo task"
        id=""
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        onKeyDown={(e) => {
          // Adds todo on Pressing Enter key.
          if (e.key === 'Enter') {
            handleAdd()
          }
        }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Createtodo;
