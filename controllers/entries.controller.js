const entries = require('../models/entries.model');

// [GET] /api/entries (Retorna todas las entries o filtra por email si se pasa por query string)
const getEntries = async (req, res) => {
    try {
        let data;
        if (req.query.email) {
            data = await entries.getAllEntries(req.query.email);
        } else {
            data = await entries.getAllEntries();
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// [POST] /api/entries (Crea nueva entry)
const createEntry = async (req, res) => {
    try {
        const newEntry = req.body;
        const response = await entries.createEntry(newEntry);
        res.status(201).json({
            message: `Entry creada correctamente`,
            rowCount: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la entry (comprueba que el título no esté repetido)" });
    }
};

module.exports = {
    getEntries,
    createEntry
};