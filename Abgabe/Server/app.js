const http = require('http');
const server = require('./server');

const port = process.env.PORT || 3000;

const app = http.createServer(server);

app.listen(port);