'use strict'

//Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas
var article_routes = require('./routes/article');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false })); //Cargar el bodyparser
app.use(bodyParser.json()); //Convertir cualquier petición en JSON

//CORS

//Añadir prefijos a las rutas / Cargar rutas
app.use('/api', article_routes);


//Exportar módulo (fichero actual)
module.exports = app;