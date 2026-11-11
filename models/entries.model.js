const pool = require('../config/db_pgsql');
const queries = require('../queries/entry.queries');

const entries = {
    // Obtener todas las entradas con los datos de sus autores
    getAllEntries: async () => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(queries.getAllEntries);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    },

    // Obtener las entradas filtradas por el email del autor
    getEntriesByEmail: async (email) => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(queries.getEntriesByEmail, [email]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    },

    // Crear una nueva entrada vinculada a un autor
    createEntry: async (entry) => {
        let client;
        try {
            client = await pool.connect();
            const { title, content, email, category } = entry;
            const result = await client.query(queries.createEntry, [title, content, email, category]);
            return result.rowCount;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    },

    // Actualizar una entrada existente por su título
    updateEntryByTitle: async (entry) => {
        let client;
        try {
            client = await pool.connect();
            const { content, category, title } = entry;
            const result = await client.query(queries.updateEntryByTitle, [content, category, title]);
            return result.rowCount;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    },

    // Eliminar entrada por título
    deleteEntryByTitle: async (title) => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(queries.deleteEntryByTitle, [title]);
            return result.rowCount;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
};

module.exports = entries;