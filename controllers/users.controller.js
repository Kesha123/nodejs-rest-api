let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db");


const fetchUsers = async (req, res) => {

    const queryParams = req.query;
    const queryValues = Object.values(queryParams).map(value => value.split(',')).flat()

    const sql = Object.keys(queryParams).length < 1
                ? "SELECT * FROM emp"
                : `SELECT * FROM emp WHERE ${
                    Object.keys(queryParams)
                        .map(field => {
                            const values = queryParams[field].split(',');
                            return `( ${values.map(value => `${field} = ?`).join(' OR ')} )`;
                        })
                        .join(' AND ')
                }`

    db.all(sql, queryValues ,(err, rows) => {
        if (err) {
            res.status(500).json({});
            return;
        }
        if (rows.length < 1) {
            res.status(404).json({});
            return;
        }
        res.status(200).json(rows)
    });
}

module.exports = {
    fetchUsers: fetchUsers,
};