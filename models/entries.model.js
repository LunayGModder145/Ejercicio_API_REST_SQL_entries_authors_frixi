const pool = require('../config/db_pgsql');
const queries = require('../queries/entry.queries');

const entries = {
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