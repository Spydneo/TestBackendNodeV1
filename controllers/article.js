'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');
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
            //Devolver artículos
            return res.status(200).send({
                status: 'Ok',
                articles
            });

        })
    },
    getArticle: (req, res) => {
        //Recoger el id de la url
        var articleId = req.params.id;
        //Comprobar si existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay id'
            })
        }
        //Buscar el artículos
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo'
                })
            }
            //Devolver artículo
            return res.status(200).send({
                status: 'Succes',
                article
            });
        })
    },
    update: (req, res) => {
        //Recoger el id del artículo por la url
        var articleId = req.params.id;
        //Recoger los datos que llegan por put
        var params = req.body;
        //validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Find an update
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artículo'
                    });
                }
                return res.status(200).send({
                    status: 'Succes',
                    article: articleUpdated
                });

            })

        } else {
            //Devolver respuesta
            return res.status(404).send({
                status: 'error',
                message: 'No existe el artículo'
            });
        }

    },
    delete: (req, res) => {
        var articleId = req.params.id;

        Article.findByIdAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar el artículo'
                });
            }
            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo'
                });
            }
            return res.status(200).send({
                status: 'Succes',
                article: articleRemoved
            });

        });
    },
    upload: (req, res) => {
        //configurar el módulo connect multiparty router/article.js
        //Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //Conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\'); // Unix '/'
        file_name = file_split[2];
        var file_ext = file_split[2].split('.')[1];
        file_ext = file_ext.toLowerCase();
        //Comprobar la extensión, solo imagenes, si es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //Borrar el archivo
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: "error",
                    message: 'La extensión de la imagen no es valida !!!'
                });
            });
        } else {
            //Si todo es valido
            var articleId = req.params.id;

            //Buscar el artículo, asignarle el nombre de la imagen y actualizarlos
            Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(200).send({
                        status: "error",
                        message: 'Error al guardar la imagen del artículo !!!'
                    });
                }
                return res.status(200).send({
                    status: 'succes',
                    article: articleUpdated,
                });
            });

        }
    }, //End upload
    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;

        fs.exists(path_file, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(200).send({
                    status: "error",
                    message: 'La imagen no existe !!!'
                });
            }
        })
    },
    search: (req, res) => {
        //sacar el string a buscar
        var searchString = req.params.search;

        //Find or, artículo sacar
        Article.find({
                "$or": [
                    { "title": { "$regex": searchString, "$options": "i" } },
                    { "content": { "regex": searchString, "$options": "i" } }
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, articles) => {

                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: 'Error en la petición',
                        string: searchString
                    });
                }
                if (!articles) {
                    return res.status(404).send({
                        status: "error",
                        message: 'No hay artículos que coincidan con tu busqueda'
                    });
                }
                return res.status(200).send({
                    status: "succes",
                    articles
                });
            });
    }

};
//end controller

module.exports = controller;