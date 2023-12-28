const express = require('express');
const { deleteUser, patchUser, putUser, createUser, fetchUser } = require('../controllers/user.controller');
const { userIdMiddleware, userMiddleware, userPatchParamMiddleware } = require('../middleware/user.middleware');


const register = () => {
    const router = express.Router();

    router.get('/:id', userIdMiddleware, fetchUser);
    router.post('/', userMiddleware, createUser);
    router.put('/:id', [ userIdMiddleware, userMiddleware ], putUser);
    router.patch('/:id', [ userIdMiddleware, userPatchParamMiddleware], patchUser);
    router.delete('/:id', userIdMiddleware, deleteUser);

    return router;
};

module.exports = register;