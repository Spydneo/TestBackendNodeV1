'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, response) => {
        var name = req.body.nombre;
        return response.status(200).send({
            message: 'hola ' + name
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Mensaje de ruta TEST'
        });
    },

    save: (req, res) => {
        //Recoger los parametros por POST
        var params = req.body;
        // console.log("Params" + params); //No funciona

        //Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title); //Cuando no este vacio el título
            var validate_content = !validator.isEmpty(params.content); //Cuando no este vacio el content

        } catch (error) {
            return res.status(400).send({
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Crear el objeto a guardar

            //Asignar valores

            //Guardar el artículo

            //Devolver una respuesta
            return res.status(200).send({
                article: params
            });

        } else {
            return res.status(400).send({
                message: 'Los datos no son validos'
            });
        }


    }

};
//end controller

module.exports = controller;