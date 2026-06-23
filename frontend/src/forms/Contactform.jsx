import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import api from "../api"; // ⬅️ Import your customized Axios instance

/**
 * ContactForm
 * Props:
 *  - city       {string}  e.g. "Dombivali"   (bold heading line)
 *  - subtitle   {string}  e.g. "Lodha Group Centre Park"
 */
export default function ContactForm({ city = "Dombivali", subtitle = "Lodha Group Centre Park" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-Side Validation Safeguard
    if (!name.trim() || !phone.trim()) {
      alert("Please enter both your name and phone number.");
      return;
    }

    setIsSubmitting(true);

    // Combine city and subtitle to dynamically track which property they requested a callback for
    const propertyName = `${city} - ${subtitle}`;

    try {
      // 2. Send Data straight to our backend endpoint route
      const response = await api.post("/inquiry/property-callback", {
        name,
        phone,
        propertyName,
      });

      if (response.data.success) {
        alert(response.data.message); // "Callback request registered successfully!..."
        setName("");                  // Reset fields on success
        setPhone("");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm w-full">
      {/* Header */}
      <p className="text-sm text-gray-500 text-center">Want to know more about</p>
      <h2 className="text-xl font-bold text-gray-900 text-center mt-0.5">{city} ?</h2>
      <p className="text-sm text-gray-500 text-center mt-0.5 mb-4">{subtitle}</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />

        <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <div className="flex items-center gap-1 px-3 bg-gray-50 border-r border-gray-300 text-sm text-gray-600 shrink-0">
            +91
            <svg className="w-3 h-3 text-gray-400 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-blue-900/50 text-white font-semibold py-3 rounded-md text-sm transition-colors duration-200 cursor-pointer flex justify-center items-center"
        >
          {isSubmitting ? "Processing..." : "Request CallBack"}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
        By continuing, you're agreeing to the{" "}
        <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>
      </p>

      <div className="flex items-center gap-1.5 mt-3">
        <CheckCircle2 size={14} className="text-gray-500 shrink-0" />
        <span className="text-xs text-gray-500">Assured Callback in 5 mins</span>
      </div>

      {/* WhatsApp helpdesk */}
      <div className="flex items-center gap-3 mt-4 border border-gray-200 rounded-lg p-3">
        <div className="bg-green-500 rounded-full p-1.5 shrink-0">
          <MessageCircle size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">+91 9693969347</p>
          <p className="text-xs text-gray-400">Contact Helpdesk (Chat only)</p>
        </div>
      </div>

      <p className="text-xs text-blue-400 hover:underline cursor-pointer text-right mt-3">
        Read Disclaimer
      </p>
    </div>
  );
}