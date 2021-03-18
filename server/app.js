const WebSocketServer = require("ws").Server;
    const express = require("express");
    const http = require("http");
    const Sequelize = require('sequelize');
    const cors = require('cors')
    const bodyParser = require('body-parser')

    const app = express();
    app.use(cors())
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    const server = http.createServer(app);

    server.listen(8080);





    

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
    
    app.post('/login',(req,res)=>{
      const {login,password} = req.body
      sequelize.authenticate().then(()=>Users.findAll({
        where:{login,password},
        raw: true
       })).then(d=>console.log(d))
      
    })









    const wss = new WebSocketServer({server});
    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        wss.clients.forEach(client=>client.send(message))
        console.log(message)
      });
    
      ws.send('something');
    });