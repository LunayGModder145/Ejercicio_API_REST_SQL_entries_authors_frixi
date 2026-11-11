// Consultas SQL para autores 
const authorQueries = {
    getAllAuthors: `SELECT * FROM authors`,
    getAuthorByEmail: `SELECT * FROM authors WHERE email = $1`,
    createAuthor: `INSERT INTO authors (name, surname, email, image) VALUES ($1, $2, $3, $4)`,
    updateAuthor: `UPDATE authors SET name = $1, surname = $2, image = $3 WHERE email = $4`,
    deleteAuthor: `DELETE FROM authors WHERE email = $1`,
    checkAuthorExists: `SELECT * FROM authors WHERE email = $1`,
    createTableAuthors: `
        CREATE TABLE IF NOT EXISTS authors (
            id_author serial PRIMARY KEY, 
            name varchar(45) NOT NULL, 
            surname varchar(45) NOT NULL, 
            email varchar(100) NOT NULL UNIQUE, 
            image varchar(255)
        );
    `,
    dropTableAuthors: `DROP TABLE IF EXISTS authors;`
};

module.exports = authorQueries;