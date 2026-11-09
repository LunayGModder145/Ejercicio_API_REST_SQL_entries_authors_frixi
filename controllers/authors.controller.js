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
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const createAuthor = async (req, res) => {
    try {
        const newAuthor = req.body;
        await authors.createAuthor(newAuthor);
        res.status(201).json({
            message: `usuario creado: ${newAuthor.email}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = req.body;
        await authors.updateAuthor(updatedAuthor);
        res.status(200).json({
            message: `usuario actualizado: ${updatedAuthor.email}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { email } = req.body; // O req.query según lo prefieras
        await authors.deleteAuthor(email);
        res.status(200).json({
            message: `Se ha borrado ${email}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
};