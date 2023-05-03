require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const path = require('path')
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const playListRoutes = require("./routes/playLists");
const searchRoutes = require("./routes/search");
const app = express();

connection();
app.use(cors());
app.use(express.json());
app.use(express.static('./build'))

app.use("/api/users/", userRoutes);
app.use("/api/login/", authRoutes); 
app.use("/api/songs/", songRoutes);
app.use("/api/playlists/", playListRoutes);
app.use("/api/", searchRoutes);

// CLIENT ROUTES FOR VERCEL
app.get('/css-initial', (req,res)=>{res.sendFile(path.resolve(__dirname+'/build/static/css/2.b28305bc.chunk.css'))})
app.get('/css-final', (req,res)=>{res.sendFile(path.resolve(__dirname+'/build/static/css/main.b1eed2c3.chunk.css'))})
app.get('/js-inital', (req,res)=>{res.sendFile(path.resolve(__dirname+'/build/static/js/2.9de7726f.chunk.js'))})
app.get('/js-final', (req,res)=>{res.sendFile(path.resolve(__dirname+'/build/static/js/main.f052993f.chunk.js'))})
app.get('/icon', (req,res)=>{ res.sendFile(path.resolve(__dirname+ '/build/favicon.png'))})
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname + '/index.html')) })  


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
