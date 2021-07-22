const { check, validationResult } = require('express-validator');

exports.validateRegisterRequest = [
    check('name').isLength({ max: 30}).withMessage('Your name can not exceed 30 characters'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    // check('password')
    // .isLength({ min: 6 })
    // .withMessage('Password must be at least 6 character long')
];

exports.validateLoginRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    // check('password')
    // .isLength({ min: 6 })
    // .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}