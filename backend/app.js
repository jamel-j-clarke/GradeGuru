express = require('express');
const routes = require( './src/api/routes/Routes' );

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  console.log(JSON.stringify(req.headers));
  res.send(`${req.headers['x-shib_displayname']}!`);
});

app.get('/shib', (req, res) => {
  res.json(req.headers);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
