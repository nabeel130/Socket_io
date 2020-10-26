const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname+"/public/board.html"));
});

io.on("connection" , (socket) =>{
    console.log("connection established");

    socket.on("disconnect" , () => {
        console.log("connection closed");
    });

    socket.on("message" , (msg)=> {
        console.log(msg);
        io.emit("board_content" , msg);
    })
})



app.get('/admin' , (req,res) => {
    res.sendFile(path.join(__dirname+"/public/admin.html"));
});

http.listen(3000,() => {
    console.log("server running..");
})
