const express = require('express');
const router = express.Router();
const db = require('../db/userData');

router.get('/', async (req,res) => {
  res.send(db);
})

module.exports = router;