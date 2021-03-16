'use restrict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

//DB Connect
mongoose.set('useFindAndModify', false); // Los métodos antiguos desactivados
mongoose.Promise = global.Promise; //Configuración interna
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log("Conexión con DB correcta!!+1");
        //Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:' + port);
        });
    });