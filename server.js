require("dotenv").config();
const express = require("express");
const { app, port, os } = require("./app.js");
const cluster = require("cluster");

// const cpu_length = os.cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
//   for (let i = 0; i < cpu_length; i++) {
//     cluster.fork();
//     cluster.on("exit", (worker, code, signal) => {
//       console.log(`worker pid ${worker.process.pid} died`);
//     });
//   }
// } else {
// }

app.listen(port, () => {
  console.log(
    
    `Worker ${process.pid} is listening on http://localhost:${port} in ${process.env.NODE_ENV} Mode`
  );
});