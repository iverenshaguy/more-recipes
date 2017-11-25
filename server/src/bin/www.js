import http from 'http';
import app from '../app';

// Set Port to 8000
const port = process.env.PORT || 8000;
app.set('port', port);

// Create New Server to Listen on Port 8000
const server = http.createServer(app);
server.listen(port);

export default server;
