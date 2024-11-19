const express  = require('express');
const mongoose = require('mongoose');
const Todorow = require('./models/todorowSchema.js'); // Import the Todorow model
const todorowSchema = require('./models/todorowSchema.js');



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

app.post('/DeleteMany', async (req, res) => {
    try {
      await Todorow.deleteMany(); // Delete all todos
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting todos');
    }
  });


  app.post('/DeleteTodo', async (req, res) => {
    try {
      const todoId = req.body.todoId; // Get the todo ID from the form submission
  
      // Find the todo by its ID and delete it
      await Todorow.findByIdAndDelete(todoId);
  
      // Redirect to the Todo list after deletion
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting todo');
    }
  });

  app.post('/EditTodo', async (req, res) => {
    try {
      const { todoId, updatedTodoName} = req.body;

      if (!updatedTodoName) {
        return res.status(400).send('Todo name is required');
      }

      await todorowSchema.findByIdAndUpdate(todoId, { TodoName: updatedTodoName });
      res.redirect('/');

    } catch (err){
      console.error(err);
      res.status(500).send('Error updating todo');  
    }
    });
  
  

/// server config   

app.listen(3000, () => {
    console.log('server is running on port 3000');
})
