import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api'; // ⬅️ Imported your API instance
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ShieldCheck
} from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: 'Buyer', 
    projectInterest: 'General Query', 
    message: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 🔑 Connected Live Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert("Please accept the communication terms to proceed.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send parameters straight to our new endpoint link
      const response = await api.post("/inquiry/contact-page-query", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType,
        projectInterest: formData.projectInterest,
        message: formData.message,
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        // Clear inputs completely
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          userType: 'Buyer',
          projectInterest: 'General Query',
          message: '',
          agreeToTerms: false
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      const msg = error.response?.data?.message || "Connection failure. Please try again.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
      }}
      className="w-full bg-gray-50 py-12 md:py-20 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4"
          >
            Get in Touch with Our Property Experts
          </motion.h1>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-gray-500 text-base sm:text-lg leading-relaxed"
          >
            Whether you are looking to buy your dream home, invest in upcoming premium launches, or list your property, our dedicated advisory desk is ready to help you out.
          </motion.p>
        </div>

        {/* Core Content Grid */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-10 items-start">
          
          {/* Left Column Contact Details Card */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#0B2354] text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-8 relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />

            <div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="text-blue-200/80 text-sm">Expect a structured response callback within 2 business hours.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={18} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Call Support Desk</p>
                  <p className="text-base font-medium mt-0.5">+91 22 4567 8900</p>
                  <p className="text-xs text-blue-200/60">Toll-free inside India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={18} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Electronic Mail Desk</p>
                  <p className="text-base font-medium mt-0.5">invest@realestatecorp.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Corporate HQ Office</p>
                  <p className="text-sm font-medium leading-relaxed mt-0.5">
                    Level 5, Capital Tower, BKC G-Block, Bandra East, Mumbai, MH - 400051
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={18} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Operating Business Hours</p>
                  <p className="text-sm font-medium mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                  <p className="text-xs text-green-400 font-medium">Site visits open on Sundays</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex items-center gap-2 text-xs text-blue-200/70">
              <ShieldCheck size={16} className="text-green-400 shrink-0" />
              <span>RERA Registered Advisor Infrastructure network.</span>
            </div>
          </motion.div>

          {/* Right Column Interactive Form Submission Layout */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10 shadow-sm relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full text-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-[#0B2354] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Mobile Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="w-full text-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-[#0B2354] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="johndoe@example.com"
                      className="w-full text-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-[#0B2354] transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">I am a</label>
                      <select 
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="w-full text-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-[#0B2354] transition-colors"
                      >
                        <option value="Prospective Buyer">Prospective Buyer / Investor</option>
                        <option value="Property Owner">Property Owner / Seller</option>
                        <option value="Tenant">Tenant looking to rent</option>
                        <option value="Broker Agent">Channel Partner / Broker Agent</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Interest</label>
                      <select 
                        name="projectInterest"
                        value={formData.projectInterest}
                        onChange={handleInputChange}
                        className="w-full text-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-[#0B2354] transition-colors"
                      >
                        <option value="General Query">General / Other Requirements</option>
                        <option value="Hubtown Seasons Ecuador">Hubtown Seasons Ecuador (Chembur)</option>
                        <option value="Centre Park">Lodha Centre Park (Dombivali)</option>
                        <option value="Purva Panorama">Purva Panorama (Thane)</option>
                        <option value="L&T Crestoria">L And T Crestoria Estate (Panvel)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Message Details</label>
                    <textarea 
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please mention your preferences..."
                      className="w-full text-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-[#0B2354] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input 
                      type="checkbox" 
                      id="agreeToTerms"
                      name="agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0B2354] border-gray-300 rounded focus:ring-0 mt-0.5 accent-[#0B2354] cursor-pointer"
                    />
                    <label htmlFor="agreeToTerms" className="text-xs text-gray-500 leading-normal select-none cursor-pointer">
                      I hereby authorize company agents to contact me via Call, SMS, or WhatsApp regarding this specific real-estate query override parameters. This supersedes any DND registries.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B2354] hover:bg-[#153470] disabled:bg-gray-400 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} /> Submit Property Query
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4 border border-green-100 shadow-sm">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank You for Connecting!</h3>
                  <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
                    Your real estate query profile has been indexed into our client tracking pipeline. An area-expert specialist will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-xs px-5 py-2.5 rounded-xl transition-colors bg-white shadow-sm"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}