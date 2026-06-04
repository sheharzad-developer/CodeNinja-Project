const { pool } = require("../connection/postgresql");
 class Connections {
    static buildConnections() {
        pool;
    }
}

module.exports = Connections
