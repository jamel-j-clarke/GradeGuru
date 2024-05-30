const mariadb = require('mariadb');

let connection;

module.exports.getDatabaseConnection = () => {
    if (!connection) {
        connection = mariadb.createPool({
            host: 'database',
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            charset: 'utf8mb4',
        });
    }
    return connection;
};

module.exports.query = (query, params = []) => {
    if (!connection) {
        connection = exports.getDatabaseConnection();
    }
    return connection.query(query, params);
};

module.exports.close = () => {
    if (connection) {
        connection.end();
        connection = null;
    }
};
