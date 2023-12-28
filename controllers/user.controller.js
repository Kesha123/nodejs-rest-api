let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db");


const fetchUser = async (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM emp WHERE empno = ?;"

    db.all(sql, [id], (err, row) => {
        if (err || row.length < 1) {
            res.status(404).json({});
        } else {
            res.status(200).json(row)
        }
    });
}

const createUser = async (req, res) => {
    const data = req.body;

    const sql = "INSERT INTO emp VALUES (?, ?, ?, ?, ?, ?, ?, ?);"

    const empno = data.empno
    const ename = data.ename
    const job = data.job
    const mgr = data.mgr
    const hiredate = data.hiredate
    const sal = data.sal
    const comm = data.comm
    const deptno = data.deptno

    db.run(sql, [empno, ename, job, mgr, hiredate, sal, comm, deptno], function (err) {
        if (err) {
            res.status(409).json({});
            return;
        }
        res.status(204).json({});
    })
}

const putUser = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    const sql = "SELECT * FROM emp WHERE empno = ?;"

    db.get(sql, [id], (err, row) => {
        if (err || row === undefined) {
            console.error(err)
            res.status(404).json({});
        } else {

            const sql = `UPDATE emp SET ${Object.keys(data).map(field => `${field} = ?`).join(', ')} WHERE empno = ?;`

            db.run(sql, [...Object.values(data), id], function (err) {
                if (err) {
                    console.error(err)
                    res.status(500).json({});
                } else {
                    res.status(204).json({});
                }
            });
        }
    });
}

const patchUser = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    const sql = "SELECT * FROM emp WHERE empno = ?;"

    db.get(sql, [id], (err, row) => {
        if (err || row === undefined) {
            res.status(404).json({});
        } else {

            const sql = `UPDATE emp SET ${Object.keys(data).map(field => `${field} = ?`).join(', ')} WHERE empno = ?`;

            db.run(sql, [...Object.values(data), id], function (err) {
                if (err) {
                    console.error(err)
                    res.status(500).json({});
                }
                res.status(204).json({});
            });
        }
    });
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM emp WHERE empno = ?;"

    db.run(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({});
        }
        res.status(200).json({});
    })
}

module.exports = {
    fetchUser: fetchUser,
    // fetchUserByCriteria: fetchUserByCriteria,
    createUser: createUser,
    putUser: putUser,
    patchUser: patchUser,
    deleteUser: deleteUser
};