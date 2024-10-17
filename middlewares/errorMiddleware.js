class errorHandlerClass extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorhandler = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  console.log(err);
  err.message = err.message || "intrnal server error";
  console.log('error throughh by errhandlerclass')
  return res.status(err.statusCode).json({ message: err.message });
};
module.exports = { errorHandlerClass, errorhandler };
