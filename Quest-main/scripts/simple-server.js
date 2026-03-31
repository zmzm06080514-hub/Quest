const express = require('express');
const path = require('path');

const app = express();
const port = 8000;
const rootDir = path.resolve(__dirname, '..');

app.use(express.static(rootDir));

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
