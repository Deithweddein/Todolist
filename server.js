const express  = require('express');
const mongoose = require('mongoose');
const Todorow = require('./models/todorowSchema.js'); // Import the Todorow model



const app = express();

/// implementing ejs

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

/// connect to mongodb

mongoose.connect('mongodb://localhost:27017/todo', {
}).then(() => {
    console.log('database connected');
}).catch((err) => {
    console.log(err);
})

app.get('/', async (req, res) => {
    try {
        const todos = await Todorow.find(); // Fetch all todos
        res.render('index', { todos }); // Pass todos to the template
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching todos');
      }
})

app.post('/TodoList', async (req, res) => {
    const TodoMain = req.body.TodoMain 
  
    if (!TodoMain) {
      return res.status(400).send('Todo name is required');
    }
  
    try {
      const newTodo = await Todorow.create({ TodoName: TodoMain });
      await newTodo.save();
      res.redirect('/');
    } catch (err) { 
      console.error(err);
      res.status(500).send('Error creating todo');
    }
  });   



/// server config   

app.listen(3000, () => {
    console.log('server is running on port 3000');
})
