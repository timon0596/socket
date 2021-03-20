const WebSocketServer = require("ws").Server;
const express = require("express");
const http = require("http");
const Sequelize = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser())
const server = http.createServer(app);

const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not alloweb by CORS'))
    }
  }
}
app.use(cors({ credentials: true, origin: whitelist }))

server.listen(8080);

const sequelize = new Sequelize('socket', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3300',
});

const Users = sequelize.define('users', {
  login: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: { type: Sequelize.TEXT, allowNull: false },
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
}, { timestamps: false });

app.post('/login', (req, res) => {
  const { login, password } = req.body
  sequelize.authenticate().then(() => Users.findAll({
    where: { login, password },
    raw: true
  })).then(d => console.log(d))
})

app.get('/cookie', (req, res) => {
  // app.get('/cookie', cors(corsOptions), (req, res) => {
  res.cookie('token', '12345ABCDE')
  // console.log(res)
  res.send('Set Cookie')
})


const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach(client => client.send(message))
    console.log(message)
  });

  ws.send('something');
});