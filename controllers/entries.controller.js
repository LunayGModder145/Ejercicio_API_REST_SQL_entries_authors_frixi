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
        const response = await entries.createEntry(newEntry);
        res.status(201).json({
            success: true,
            message: `Entry creada correctamente`,
            affectedRows: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const updateEntry = async (req, res) => {
    try {
        const updatedEntry = req.body;
        const response = await entries.updateEntryByTitle(updatedEntry);
        res.status(200).json({
            message: `Se ha modificado la entry '${updatedEntry.title}'`
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