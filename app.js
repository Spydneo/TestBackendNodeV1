'use strict'

//Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS

//Añadir prefijos a las rutas

//Ruta o método de prueba
app.get('/probando', (req, response) => {

    return response.status(200).send({ message: 'hola perro' })
});
//Exportar módulo (fichero actual)
module.exports = app;