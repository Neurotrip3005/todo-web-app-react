const { conn, seedData, Todo, Category } = require('./db');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/todos', async(req, res, next)=> {
  try {
    const todos = await Todo.findAll();
    res.send(todos);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/categories', async(req, res, next)=> {
  try {
    res.send(await Category.findAll());
  }
  catch(ex){
    next(ex);
  }
});





app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try{
    console.log(`listening on port ${port}`);
    await conn.sync({ force: true });
    console.log('connected');
    await seedData();
    console.log('seeded');
  }
  catch(ex){
    console.log(ex);
  }
});
