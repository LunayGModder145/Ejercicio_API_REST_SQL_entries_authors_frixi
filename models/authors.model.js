// Importación del pool de conexiones a PostgreSQL y las consultas SQL de autores
const pool = require('../config/db_pgsql');
const queries = require('../queries/author.queries');

const authors = {
    // Obtener todos los autores
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

    // Buscar un autor por su correo electrónico
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

    // Crear un nuevo autor
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
    },

    // Actualizar los datos de un autor existente o recién creado
    updateAuthor: async (author) => {
        let client;
        try {
            client = await pool.connect();
            const { name, surname, image, email } = author;
            const result = await client.query(queries.updateAuthor, [name, surname, image, email]);
            return result.rowCount;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            if (client) client.release();
        }
    },

    // Eliminar a un autor por email
    deleteAuthor: async (email) => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(queries.deleteAuthor, [email]);
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