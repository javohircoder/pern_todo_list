import React, { Fragment } from "react";

import "./App.css"

//components

import InputTodo from "./components/inputTodo";

import ListTodos from "./components/listTodo";

function App() {
  return (
  <Fragment>
    <div className="container pb-5">
      <InputTodo />
      <ListTodos />
    </div>
  </Fragment>
  );
}

export default App;
