import React, {Fragment, useEffect, useState} from "react";

import EditTodo from "./editTodo";

const ListTodos = () => {
  

  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (err) {
      console.error(err.message);
      
    }

  }


  const getTodos = async () => {
    try {
      
      const response = await fetch('http://localhost:4000/todos')
      const jsonData = await response.json()

      setTodos(jsonData);

    } catch (err) {
      console.error(err.message);
      
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);
  return (  
  <Fragment>
    <table className="table mt-5 tex-center w-50 ml-auto mr-auto border">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
    <tbody>
          {/*<tr>
          <td>John</td>
          <td>Doe</td>
          <td>Doe@gmail.com</td>
        </tr> */}
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.description}</td>
            <td>
              <EditTodo todo={todo}/>
              </td>
            <td>
              <button data-id={todo.todo_id} className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
  </Fragment>
  );
};

export default ListTodos;