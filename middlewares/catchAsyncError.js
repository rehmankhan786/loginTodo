const catchAsyncError = (passedfunction) => (req, res, next) => {
  Promise.resolve(passedfunction(req, res, next)).catch(next);
};
module.exports = catchAsyncError;
