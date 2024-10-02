const errorHandlingMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.satus(500).send('Something broke');
}

module.exports = errorHandlingMiddleware;