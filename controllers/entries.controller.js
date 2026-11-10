const entries = require('../models/entries.model');

const getEntries = async (req, res) => {
    try {
        let data;
        if (req.query.email) {
            data = await entries.getEntriesByEmail(req.query.email);
        } else {
            data = await entries.getAllEntries();
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const createEntry = async (req, res) => {
    try {
        const newEntry = req.body;
        await entries.createEntry(newEntry);
        res.status(201).json({
            message: `Se ha creado la entry: ${newEntry.title}`
        });
    } catch (error) {
        // Código 23505 = duplicado UNIQUE en PostgreSQL
        if (error.code === '23505') {
            return res.status(400).json({ error: "Ya existe una entrada con ese título" });
        }
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const updateEntry = async (req, res) => {
    try {
        const updatedEntry = req.body;
        const response = await entries.updateEntryByTitle(updatedEntry);
        res.status(200).json({
            message: `Se ha modificado la entrada '${updatedEntry.title}'`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const deleteEntry = async (req, res) => {
    try {
        const { title } = req.body;
        await entries.deleteEntryByTitle(title);
        res.status(200).json({
            message: `Se ha borrado la entry '${title}'`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
};