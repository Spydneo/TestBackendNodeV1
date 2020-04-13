'use strict'

//Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas

//Middlewares
app.use(bodyParser.urlencoded({ extended: false })); //Cargar el bodyparser
app.use(bodyParser.json()); //Convertir cualquier petición en JSON

//CORS

//Añadir prefijos a las rutas

//Ruta o método de prueba
app.post('/probando', (req, response) => {
    var name = req.body.nombre;
    return response.status(200).send({ message: 'hola ' + name })
});
//Exportar módulo (fichero actual)
module.exports = app;