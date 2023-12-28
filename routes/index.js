const health = require('./health.routes');
const users = require('./users.routes');
const user = require('./user.routes');


const prefix = "/api"

const registerRoutes = (app) => {
    app.use(`${prefix}/health_`, health());
    app.use(`${prefix}/users`, users());
    app.use(`${prefix}/user`, user());
    app.use((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({});
    });
}

module.exports = registerRoutes;