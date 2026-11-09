const pool = require('../config/db_pgsql');
const queries = require('../queries/author.queries');

const authors = {
    getAllAuthors: async () => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(queries.getAllAuthors);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    },
    getAuthorByEmail: async (email) => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(queries.getAuthorByEmail, [email]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    },
    createAuthor: async (author) => {
        let client;
        try {
            client = await pool.connect();
            const { name, surname, email, image } = author;
            const result = await client.query(queries.createAuthor, [name, surname, email, image]);
            return result.rowCount;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    }
};

module.exports = authors;