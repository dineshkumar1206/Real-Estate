const multer = require("multer");

// Configure memory storage instead of disk storage to avoid saving files on disk
const storage = multer.memoryStorage();

// File validation filter for security
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp/;
  const isMimeValid = allowedFileTypes.test(file.mimetype);

  if (isMimeValid) {
    return cb(null, true);
  }
  cb(new Error("Only images of format JPEG, JPG, PNG, or WEBP are allowed!"), false);
};

// Expose multer upload middleware with size limit of 5MB per file and 15MB per text field
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
    fieldSize: 15 * 1024 * 1024, // 15 MB per text field
  },
  defParamCharset: "utf8", // Decode text fields (price, title, etc.) as UTF-8 to preserve special characters like ₹
});

module.exports = { upload };
