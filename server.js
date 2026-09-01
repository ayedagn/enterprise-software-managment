const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Enterprise Software Management API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 Handler - must be last
app.use((req, res) => {
  res.status(200).json({ 
    message: 'Welcome to Enterprise Software Management',
    path: req.path,
    redirect: '/'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', redirect: '/' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
