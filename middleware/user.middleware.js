const { isValidUser } = require('../validators/user.validator')

const ALLOWED_PARAMETERS = [
    "empno",
    "ename",
    "job",
    "mgr",
    "hiredate",
    "sal",
    "comm",
    "deptno"
]

const userIdMiddleware = async (req, res, next) => {

    const id = req.params.id;

    if (id === undefined || isNaN(id)) {
        res.status(404).json({});
        return;
    }

    next();

}

const userMiddleware = async (req, res, next) => {

    const payload = req.body;

    if (!isValidUser(payload)) {
        res.status(400).json({});
        return;
    }

    next();

}

const userPatchParamMiddleware = async (req, res, next) => {

    const data = req.body;

    if (data === undefined || Object.keys(data).length < 1) {
        res.status(400).json({});
        return;
    }

    let paramsAllowed = Object.keys(data).every(param => ALLOWED_PARAMETERS.includes(param));

    if (!paramsAllowed) {
        res.status(400).json({});
        return;
    }

    next();

}

const userGetParamMiddleware = async (req, res, next) => {

    const data = req.query;

    let paramsAllowed = Object.keys(data).every(param => ALLOWED_PARAMETERS.includes(param));

    if (!paramsAllowed) {
        res.status(400).json({});
        return;
    }

    next();

}

module.exports = {
    userIdMiddleware: userIdMiddleware,
    userMiddleware: userMiddleware,
    userPatchParamMiddleware: userPatchParamMiddleware,
    userGetParamMiddleware: userGetParamMiddleware
}