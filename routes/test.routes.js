const express = require('express');
const router = express.Router();
const testDAO = require('../dao/test.dao');

router.get('/', testDAO.getAll);
router.get('/:id', testDAO.getById);
router.post('/', testDAO.create);

module.exports = router;