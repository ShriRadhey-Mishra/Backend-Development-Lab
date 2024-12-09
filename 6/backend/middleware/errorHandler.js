// Logs errors to the console
const logErrors = (err, req, res, next) => {
    console.error(err.stack);
    next(err); // Pass the error to the next middleware
};

// Sends a user-friendly error message
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message
    });
};

module.exports = { logErrors, errorHandler };
