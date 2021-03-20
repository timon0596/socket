const WebSocketServer = require("ws").Server;
const jwt = require('jsonwebtoken')
const express = require("express");
const http = require("http");
const Sequelize = require('sequelize');
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const tokenKey = '1a2b-3c4d-5e6f-7g8h'


const app = express();
app.use(cookieParser())
const origin = ['http://localhost:8080','http://localhost:3000']
app.use(cors({credentials:true,origin}))
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(bodyParser.json());

const sequelize = new Sequelize('socket', 'root', 'root',{
  host: 'localhost',
  dialect: 'mysql',
  port: '3300'
});

const Users = sequelize.define('users', {
  login: {type: Sequelize.STRING, unique: true,allowNull: false},
  password: {type: Sequelize.TEXT, allowNull: false},
  id: {type: Sequelize.INTEGER, primaryKey: true,allowNull: false}
},{ timestamps: false });

app.post('/login',async (req,res)=>{
  const {login,password} = req.body
  await sequelize.authenticate()
  const [user] = await Users.findAll({
    where:{login,password},
    raw: true
    })
    
  if(user){
    const token = jwt.sign({ id: user.id }, tokenKey) 
    
    res.cookie('token',token,{expires: new Date(Date.now() + 3*1000*3600  + 1000*10),sameSite: false})
    return res.status(200).json({
      id: user.id,
      login: user.login,
      token,
    })
  }
  return res.status(404).json({ message: 'User not found' })
  
})

const server = http.createServer(app);

server.listen(8080);
const wss = new WebSocketServer({server});
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach(client=>client.send(message))
    console.log(message)
  });

  ws.send('something');
});