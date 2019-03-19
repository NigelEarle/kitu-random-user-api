const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db/userData');
const makeDuplicateRequestArray = require('../util/helper');
const { checkEmptyObject , checkEmptyField, checkValidEmail, checkValidCellNum } = require('../util/validations');

router.get('/', async (req, res) => {
  try {
    const [...response] = await axios.all(makeDuplicateRequestArray(1, 'https://randomuser.me/api'));
    [...response].map((data) => {
      const { gender, name, location, email, cell } = data.data.results[0];
      const userObj = {
        gender: gender,
        firstname: name.first,
        city: location.city,
        email: email,
        cell: cell
      }
      db.userData.push(userObj);
    })
    return res.status(200).send(db.userData);
  } catch(err) {
    console.log('err', err);
    return res.status(404).send({message: 'Users not found'});
  }
})

router.get('/firstname/:firstname', (req, res) => {
  const firstName = db.userData.filter(data => {
    return data.firstname === req.params.firstname;
  })

  if (firstName.length > 0){
    return res.status(200).send(...firstName);
  } else {
    return res.status(404).send({ message: 'User not found!'});
  }
})

router.post('/', checkEmptyObject, checkEmptyField, checkValidEmail, checkValidCellNum, (req, res) => {
  try {
    db.userData.push(req.body);
    return res.status(201).send({message: 'User successfully created!'});
  } catch(err) {
    console.log('err', err);
    return res.status(404).send({message: 'Error: Unable to create User'});
  }
})

module.exports = router;