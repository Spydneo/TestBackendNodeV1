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
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Crear el objeto a guardar
            var article = new Article();
            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el artículo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: err,
                        message: 'El artículo no se ha guardado'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article
                });
            });
        } else {
            return res.status(400).send({
                status: error,
                message: 'Los datos no son validos'
            });
        }


    },
    getArticles: (req, res) => {
        var query = Article.find({});

        var last = req.params.last;
        console.log("last = " + last);

        if (last || last != undefined) {
            query.limit(5);
        }

        //Find
        query.sort('-id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener los artículos'
                });
            }
            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos'
                });
            }
            return res.status(200).send({
                status: 'Ok',
                articles
            });

        })
    }

};
//end controller

module.exports = controller;