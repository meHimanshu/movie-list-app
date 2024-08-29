const { check } = require("express-validator");
const handleValidationErrors = require("../constants/helper");

const validateSearch = [
    check("searchText")
        .optional()
        .isString()
        .withMessage("searchText must be a string"),
    handleValidationErrors
];

const validateId = [
    check("id")
        .isInt()
        .withMessage("id must be an integer"),
    handleValidationErrors
];

module.exports = {
    validateSearch,
    validateId,
};
