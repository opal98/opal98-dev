import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = join(fileURLToPath(import.meta.url), "..");
const bare = createBareServer("/bare/");
const app = express();
const publicPath = "public"; // if you renamed your directory to something else other than public

app.use(express.static(publicPath));

app.use((req, res) => {
    res.status(404);
    res.sendFile(join(__dirname, publicPath, "404.html")); // change to your 404 page
});

const server = createServer();

server.on("request", (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

server.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/games.html'));
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 3000; // set your port

server.on("listening", () => {
    const address = server.address();
    console.log("Listening on:");
    console.log(`\thttp://localhost:${address.port}`);
    console.log(
        `\thttp://${
            address.family === "IPv6" ? `[${address.address}]` : address.address
        }:${address.port}`
    );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close();
    bare.close();
    process.exit(0);
}

server.listen({
    port,
});

// const express = require('express'); 
// const path = require('path');
// const createServer = require("node:http");
// // const publicPath = require("ultraviolet-static");
// // const uvPath = require("@titaniumnetwork-dev/ultraviolet");
// // const epoxyPath = require("@mercuryworkshop/epoxy-transport");
// // const baremuxPath = require("@mercuryworkshop/bare-mux");
// // const join = require("node:path");
// // const hostname = require("node:os");
// // const wisp = require("wisp-server-node");

// const app = express(); 
// const PORT = 3000; 

// app.use('/', express.static("public")) 
// // app.use("/uv/", express.static(uvPath));
// // app.use("/epoxy/", express.static(epoxyPath));
// // app.use("/baremux/", express.static(baremuxPath));

// app.get('/e', (req, res)=>{ 
//     res.set('Content-Type', 'text/html'); 
//     res.status(200).send("Hello GFG Learner!"); 
// }); 


// app.listen(PORT, (error) =>{ 
//     if(!error) 
//         console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
//     else 
//         console.log("Error occurred, server can't start", error); 
//     } 
// ); 