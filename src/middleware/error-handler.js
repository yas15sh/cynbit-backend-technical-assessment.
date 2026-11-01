export function errorHandler(err, _req, res, _next) {
  console.error({ name: err.name, message: err.message, code: err.code });
  const status = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: status >= 500 ? "An unexpected error occurred." : err.message
    }
  });
}
