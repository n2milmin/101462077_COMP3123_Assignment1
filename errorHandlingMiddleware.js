const errorHandlingMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const errorObj = { 
        status: 500,
        message: 'Something broke',
        err: err.message
    };
    res.satus(500).send(errorObj);
}

module.exports = errorHandlingMiddleware;