const express = require('express');
const router = express.Router();

router.use(express.json());

const controller = require('./user.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);
router.post('/', controller.create);

module.exports = router;