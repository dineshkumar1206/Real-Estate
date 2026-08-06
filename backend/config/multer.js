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

// Expose multer upload middleware with size limit of 5MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = { upload };
