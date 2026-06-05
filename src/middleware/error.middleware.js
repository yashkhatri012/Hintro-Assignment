
export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    traceId: req.traceId,
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message,
    },
  });
};