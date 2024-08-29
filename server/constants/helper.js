const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: "Incorrect request ! request validation failed.",
            errors: errors.array()
        });
    }
    next();
};

module.exports = handleValidationErrors;
