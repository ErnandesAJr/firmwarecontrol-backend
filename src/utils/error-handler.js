const http = require('./http-constants');

const createError = (error) => {
    if (error.errors) {
        const { message, type } = error.errors[0];
        return { code: http.BAD_REQUEST, message: { type, message } };
    } else {
        return { code: http.INTERNAL_ERROR, message: `Error: ${error.message}` };
    }
}

const notFoundError = (attribute) => {
    return attribute ? { code: http.NOT_FOUND, message: `No results were found with the attribute ${attribute}` } : { code: http.NOT_FOUND, message: `No results found` };
}

const findError = (error) => {
    return { code: error.code || http.INTERNAL_ERROR, message: `${error.message} to query in the database` };
}

module.exports = {
    notFoundError,
    createError,
    findError
}