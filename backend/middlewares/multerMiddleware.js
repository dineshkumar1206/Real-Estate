const multer = require("multer");
const { upload } = require("../config/multer");

// Configure Multer to accept single image card cover and multiple gallery images
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "carouselImagesFiles", maxCount: 15 },
]);

/**
 * Middleware wrapper for handling Multer image uploads
 * Catch file size limit errors, invalid file formats, and other upload issues,
 * and return a clean 400 Bad Request response.
 */
const handleImageUpload = (req, res, next) => {
  uploadFields(req, res, (err) => {
    if (err) {
      // Handle Multer specific errors
      if (err instanceof multer.MulterError) {
        let errorMessage = "Multer uploading error.";
        
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            errorMessage = "Image size is too large. Maximum size allowed is 5MB.";
            break;
          case "LIMIT_FILE_COUNT":
            errorMessage = "Too many images uploaded. The limit is 15 gallery images and 1 cover image.";
            break;
          case "LIMIT_UNEXPECTED_FILE":
            errorMessage = `Unexpected field uploaded: ${err.field}. Only 'image' (1 file) and 'carouselImagesFiles' (max 15 files) are allowed.`;
            break;
          case "LIMIT_FIELD_VALUE":
            errorMessage = "A form field value is too large. Please use a smaller image or reduce gallery size.";
            break;
          default:
            errorMessage = err.message;
        }
        
        return res.status(400).json({
          success: false,
          message: errorMessage
        });
      }
      
      // Handle custom file filter errors or other errors
      return res.status(400).json({
        success: false,
        message: err.message || "An error occurred during file upload validation."
      });
    }
    
    // Proceed to the next middleware/controller if no error occurred
    next();
  });
};

module.exports = { handleImageUpload };
