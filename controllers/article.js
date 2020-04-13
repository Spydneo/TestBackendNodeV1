'use strict'

var controller = {

    datosCurso: (req, response) => {
        var name = req.body.nombre;
        return response.status(200).send({ message: 'hola ' + name });
    },

    test: (req, res) => {
        return res.status(200).send({ message: 'Mensaje de ruta Test' });
    }

};
//end controller

module.exports = controller;