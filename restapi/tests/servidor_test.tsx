/**
 * Servidor de ayuda con la ejecución de los tests
 * Para iniciar la restapi usando una bd interna
 */

 const { MongoMemoryServer } = require("mongodb-memory-server");
 const express = require('express');
 const mongoose = require('mongoose');
 const api = require('../api');
 
 let mongod: { start: () => any; getUri: () => any; stop: () => any; server: { close: () => any; } };

 
 /**
  * Iniciar la base de datos
  */
 module.exports.startBD = async () => {
     mongod = new MongoMemoryServer({ binary: { version: "4.4.5" }, instance: { port: 27017, dbName: "testBD" } });
     await mongod.start();
     const mongo_uri = await mongod.getUri();
     console.log("Conectado a: " + mongo_uri);
 }
 
 /**
  * Iniciar el Servidor
  */
 module.exports.startServidor = async () => {
     await mongoose.connect("mongodb+srv://admin:admin1234@dede-es3a.thyhc.mongodb.net/dede?retryWrites=true&w=majority");
 
     console.log("Conexión realizada con éxito.");
 
     var app = express();
 
     app.use(express.json());
     app.use("/api", api);
 
     mongod.server = await app.listen(5000);
 
     return app;
 }
 
 /**
  * Cerrar el Servidor
  */
 module.exports.closeServidor = async () => {
     await mongoose.connection.close();
     await mongod.server.close();
     console.log("Servidor cerrado.");
 }
 
 /**
  * Cerrar la base de datos
  */
 module.exports.closeBD = async () => {
     await mongod.stop();
 }

