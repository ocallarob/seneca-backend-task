const app = require('./src');

const port = 4000; // TODO Configurable

app.get('/', (req, res) => res.send('Hello World!')); // TODO Remove?

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
