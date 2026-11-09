const pool = require('../config/db_pgsql');
const queries = require('../queries/entry.queries');

const entries = {};

// Obtener todas las entradas (o filtrar por email si lo hay)
entries.getAllEntries = async (email) => {
    let client;
    try {
        client = await pool.connect();
        let result;
        if (email) {
            result = await client.query(queries.getEntriesByEmail, [email]);
        } else {
            result = await client.query(queries.getAllEntries);
        }
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (client) client.release();
    }
};

// Crear entrada nueva
entries.createEntry = async (entry) => {
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
};

module.exports = entries;