const express = require('express');
const { fetchUsers } = require('../controllers/users.controller');
const { userGetParamMiddleware } = require('../middleware/user.middleware')


const register = () => {
    const router = express.Router();
    router.get('/', userGetParamMiddleware, fetchUsers);
    return router;
};

module.exports = register;