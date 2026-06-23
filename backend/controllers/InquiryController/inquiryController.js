const Inquiry = require("../../models/Inquiry/inquiryModel");

// 📥 Form 1: Handle Form Submission for Property Callbacks (Sidebar Form)
exports.submitPropertyCallback = async (req, res) => {
  const { name, phone, propertyName } = req.body;

  // Basic Validation Safeguard
  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all mandatory fields (Name and Phone Number).",
    });
  }

  try {
    // Generate inquiry row in the database
    const newInquiry = await Inquiry.create({
      formType: "property_callback",
      name,
      phone,
      propertyName: propertyName || "General Property Page",
    });

    return res.status(201).json({
      success: true,
      message: "Callback request registered successfully! An agent will connect soon.",
      data: newInquiry,
    });
  } catch (error) {
    console.error("Inquiry Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while processing your request.",
    });
  }
};

// 📥 Form 2: Handle Form Submission for Standalone Contact Pages (ContactUs Form)
exports.submitContactPageQuery = async (req, res) => {
  const { fullName, email, phone, userType, projectInterest, message } = req.body;

  // Strict Validation Safeguard for the Contact Form
  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required query fields (Name, Email, Phone, and Message).",
    });
  }

  try {
    // Inject the values directly into our unified database layout
    const newContactQuery = await Inquiry.create({
      formType: "contact_page",
      name: fullName,       // Maps frontend 'fullName' to the 'name' database column
      email,
      phone,
      userRole: userType,   // Maps frontend 'userType' to 'userRole' database column
      projectInterest,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your property query profile has been indexed successfully!",
      data: newContactQuery,
    });
  } catch (error) {
    console.error("Contact Form Save Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while processing your request.",
    });
  }
};