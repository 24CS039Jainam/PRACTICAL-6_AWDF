function errorHandler(error, req, res, next) {
  console.error("[24CS039]", error.message);

  if (error.name === "ValidationError") {
    const details = Object.values(error.errors).map(item => ({
      field: item.path,
      message: item.message
    }));

    return res.status(400).json({
      success: false,
      studentId: "24CS039",
      error: "Validation failed",
      details
    });
  }

  res.status(500).json({
    success: false,
    studentId: "24CS039",
    error: "Server error"
  });
}

module.exports = errorHandler;
