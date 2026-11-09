const authors = require('../models/authors.model');

const getAuthors = async (req, res) => {
    try {
        let data;
        if (req.query.email) {
            data = await authors.getAuthorByEmail(req.query.email);
        } else {
            data = await authors.getAllAuthors();
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("DETALLE:", error); // Muestra el error en la terminal
        res.status(500).json({ error: error.message }); // Muestra el error exacto en pantalla
    }
};

const createAuthor = async (req, res) => {
    try {
        const newAuthor = req.body;
        const response = await authors.createAuthor(newAuthor);
        res.status(201).json({
            success: true,
            message: `Autor creado correctamente`,
            affectedRows: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    getAuthors,
    createAuthor
};