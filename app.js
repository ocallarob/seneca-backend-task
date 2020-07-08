const app = require('./src');

const port = process.env.port || 8081;

app.get('/', (req, res) => res.send('Hello World!')); // TODO Remove?

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
