const WebSocketServer = require("ws").Server;
const jwt = require('jsonwebtoken')
const express = require("express");
const session = require("express-session");
const http = require("http");
const Sequelize = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const tokenKey = '1a2b-3c4d-5e6f-7g8h';
const app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
app.use(cors({ credentials: true, origin: whitelist }))
app.use(session({
  expires: new Date(Date.now() + 3 * 1000 * 3600 + 1000 * 10),
  cookie: { expires: new Date(Date.now() + 3 * 1000 * 3600 + 1000 * 10), sameSite: false },
  secret: 'sess_secret',
  resave: false,
  saveUninitialized: true,
   }))

const sequelize = new Sequelize('socket', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3300'
});

const Users = sequelize.define('users', {
  login: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: { type: Sequelize.TEXT, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  surname: { type: Sequelize.STRING, allowNull: false },
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
}, { timestamps: false });

app.use((req,res,next)=>{
  const {cookies:{token}} = req
    const {expires,name,surname,id} = token?jwt.verify(token,tokenKey):{}
    if(token&&expires&&new Date()<new Date(expires)){
      res.locals.auth = true
      res.locals.user = { name,surname,id }
      next()
    }else{
      res.clearCookie('token')
      res.locals.user = null
      res.locals.auth =false
      res.status(401).json({auth:false})
    }
  
})
app.get('/user',(req,res)=>{
  const {locals} = res
  if(locals.auth){
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    res.status(200).json({...locals})
  }else{
    res.status(401).json({auth:false})
  }
})

app.post('/login', async (req, res) => {
  const { login, password } = req.body
  await sequelize.authenticate()
  const [user] = await Users.findAll({ where: { login, password }, raw: true })
  if (user) {
    const {name,surname,id} = user
    const token = jwt.sign({ 
      name,surname,id,
      expires: new Date(Date.now() + 3 * 1000 * 3600 + 1000 * 3600 * 24),
      
    }, tokenKey)
    res.cookie('token', token, { expires: new Date(Date.now() + 3 * 1000 * 3600 + 1000 * 3600 * 24), sameSite: false })
    
    return res.status(200).json({
      name,
      surname,
      id
    })
  }
  return res.status(200).json({ message: 'User not found' })
})

const server = http.createServer(app);

server.listen(8080);
const wss = new WebSocketServer({server});
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach(client=>client.send(message))
    console.log(message)
  });

});