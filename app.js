const express = require('express'); 
const path = require('path');
const createServer = require("node:http");
// const publicPath = require("ultraviolet-static");
// const uvPath = require("@titaniumnetwork-dev/ultraviolet");
// const epoxyPath = require("@mercuryworkshop/epoxy-transport");
// const baremuxPath = require("@mercuryworkshop/bare-mux");
// const join = require("node:path");
// const hostname = require("node:os");
// const wisp = require("wisp-server-node");

const app = express(); 
const PORT = 3000; 

app.use('/', express.static("public")) 
// app.use("/uv/", express.static(uvPath));
// app.use("/epoxy/", express.static(epoxyPath));
// app.use("/baremux/", express.static(baremuxPath));

app.get('/e', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
    res.status(200).send("Hello GFG Learner!"); 
}); 


app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 