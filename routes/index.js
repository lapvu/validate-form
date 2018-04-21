const express = require('express');
const router = express.Router();
const sign_up = require('../validation/sigup');
const { validationResult } = require('express-validator/check');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Sign up' });
});
router.post('/signup', sign_up, (req, res) => {
  const { email, password, address, full_name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({
      errors: errors.mapped()
    })
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email: email,
      password: bcrypt.hashSync(password, salt),
      full_name: full_name,
      address: address
    })
    user.save((err) => {
      if (err) return handleError(err);
      res.send('ok');
    })
  }
})
module.exports = router;
