const app = require('./src');

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
