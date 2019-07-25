const express = require('express');

const app = express();

//CONDITIONS IF DEPLOYED TO PRODUCTION
if (process.env.HTTP_PORT) {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//ROUTES
app.get('/api/theworld', (req, res) => {
  res.json({ answer: 'worlds' });
});

//SERVER RUNNING
const port = process.env.HTTP_PORT || 2000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
