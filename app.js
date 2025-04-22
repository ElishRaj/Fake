// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware to parse URL-encoded bodies (for form data) and JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sample in-memory data (Simulating a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let posts = [
  { id: 1, title: 'First Post', content: 'This is the first post', author: 'John' },
  { id: 2, title: 'Second Post', content: 'This is the second post', author: 'Jane' }
];

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Node.js App</h1>
    <p>Available routes:</p>
    <ul>
      <li>GET /users - Get all users</li>
      <li>GET /users/:id - Get a specific user by ID</li>
      <li>POST /users - Create a new user</li>
      <li>GET /posts - Get all posts</li>
      <li>GET /posts/:id - Get a specific post by ID</li>
      <li>POST /posts - Create a new post</li>
    </ul>
  `);
});

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a specific user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// POST - Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// GET all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET a specific post by ID
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.json(post);
});

// POST - Create a new post
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).send('Title, content, and author are required');
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Catch-all route for undefined routes (404 error)
app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
