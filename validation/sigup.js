const { check } = require('express-validator/check');
const User = require('../models/User');

const sign_up = [
    check('email').isEmail().withMessage('Bạn cần 1 email').custom(value => {
        return User.findOne({ email: value }).then(data => {
            if (data) throw new Error('Email đã tồn tại')
            return true
        })
    }),
    check('password', 'Password cần có 6 ký tự').isLength({ min: 6 }).trim(),
    check('confirm_password', 'Password không khớp').custom((value, { req }) => {
        if (req.body.password === undefined) return true;
        return value === req.body.password
    }),
    check('full_name').trim().isLength({ min: 1 }).withMessage('Bạn cần điền tên đầy đủ')
]
module.exports = sign_up;