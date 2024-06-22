const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.json({ message: 'Testing post method' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
