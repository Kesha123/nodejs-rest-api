const express = require('express');

const register = () => {
    const router = express.Router();

    router.get("/", (req, res) => {
      res.json({ status: "OK" });
    });

    return router;
};

module.exports = register;