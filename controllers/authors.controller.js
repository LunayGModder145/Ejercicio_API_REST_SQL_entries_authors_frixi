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
        const { name, surname, email, image } = req.body;
        
        // Comprobar si el autor ya existe en la BBDD
        const authorExists = await authors.getAuthorByEmail(email);
        if (authorExists.length > 0) {
            return res.status(400).json({ error: `El autor con email ${email} ya existe` });
        }

        await authors.createAuthor({ name, surname, email, image });
        res.status(201).json({
            message: `usuario creado: ${email}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { email, newName, newSurname, newImage, newEmail } = req.body;
        // Si no mandan nuevo email, mantenemos el actual
        const authorToUpdate = {
            name: newName,
            surname: newSurname,
            image: newImage,
            email: newEmail || email,
            oldEmail: email
        };
        
        await authors.updateAuthor(authorToUpdate);
        res.status(200).json({
            message: `usuario actualizado: ${authorToUpdate.email}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { email } = req.body;
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