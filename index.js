const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const {row, rows} = require("./db");

const app = express();


//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create todo
app.get("/todos", async (req, res) => {
  const dql = `select * from todo`

  const data = await rows(dql)
  res.send(data)
})
app.post("/todos", async(req,res) => {

  const {description } = req.body
  console.log(description)

  const Sql = ` insert into todo (description) values ($1) returning *`


  console.log(description);

try{
  const data = await row(Sql, description)
res.send(data)
}
catch(err){
  console.log(err);
}
})

//get all todos

app.get("/todos", async(req, res) => {
  try {

    const allTodos = await rows('SELECT * FROM todo')

    // const allTodos = await pool.query("SELECT * FROM todo")
    res.send(allTodos.rows);
  } catch (err) {
    console.log(err.message)
    
  }
})

//get a todo

app.get("/todos/:id", async(req, res) => {
  try {
    const {id} = req.params;
    // console.log(req.params);

    // const todo = await pool.query("SELECT * FROM todo where todo_id = $1", id);

    const data = await rows('SELECT * FROM todo where todo_id = $1', id)
    
    res.send(data)
    
  } catch (err) {
    console.log(err.message);
    
  }
});


//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await rows('UPDATE todo SET description = $1 where todo_id = $2 returning *', description, id)
    
    // const updateTodo = await pool.query("UPDATE todo SET decsription = $1 where todo_id = $2", [description, id]);
    
    res.send(updateTodo)

  } catch (err) {
    console.log(err.message);
    
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params; 
    console.log(id);
    
    const deleteTodo = await rows('DELETE FROM todo WHERE todo_id = $1 returning *', id);

    // res.send(deleteTodo);
    res.json("delete id");
  } catch (err) {
    console.log(err.message);
    
  }
});


// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended: true }));

//simple route



const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
  console.log(`Server is running port ${PORT}.`);
});

