const Pool = require("pg").Pool;

const pool = new Pool ({
  user: "postgres",
  password: "12",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

const rows = async (SQl, ...params) => {

  const client = await pool.connect()

  try{
    const { rows } = await client.query(SQl, params)

    return rows
  }
  catch(err){
    console.log(err);
  }
}
const row = async (SQl, ...params) => {

  const client = await pool.connect()

  try{
    const { rows: [row] } = await client.query(SQl, params)

    return row
  }
  catch(err){
    console.log(err);
  }
}

module.exports = {
  row,
  rows
}