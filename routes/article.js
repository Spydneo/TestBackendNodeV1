'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

//Rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-controlador', ArticleController.test);
//Rutas útilies
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);

module.exports = router;