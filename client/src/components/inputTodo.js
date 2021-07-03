import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] =  useState('');
   
  const onSubmitForm = async (evt) => {
    evt.preventDefault();

    try {
      const body = {description};
      const response = await fetch('http://localhost:4000/todos', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      });

      // console.log(response);
      window.location = '/';
    } catch (err) {
      console.error(err.message);
      
    }
  }


  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo list</h1>
      <form className="d-flex w-50 m-auto mt-5" onSubmit={onSubmitForm}>
        <input type="input" className="form-control" placeholder="write todo list" value={description} 
        onChange={e => setDescription(e.target.value)} />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
}

export default InputTodo;