import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { HiEye, HiEyeOff } from "react-icons/hi";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin, reset } from "../redux/AdminAuthSlice/AdminAuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("success");
  
  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  const togglePassword = () => setShowPass(!showPass);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.includes(" ")) return; 
    setPassword(value);
  };

  useEffect(() => {
    if (isSuccess && admin) {
      setSnackMsg("Welcome back! Redirecting to panel...");
      setSnackType("success");
      setSnackOpen(true);

      setTimeout(() => {
        navigate("/admin", { replace: true });
        dispatch(reset());
      }, 200);
    }

    if (isError) {
      setSnackMsg(message || "Authentication failed. Check your entries.");
      setSnackType("error");
      setSnackOpen(true);
      dispatch(reset());
    }

    return () => {
      dispatch(reset());
    };
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const isFormValid = validEmail && password.length > 0;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const adminData = { email, password };
    dispatch(loginAdmin(adminData));
  };

  return (
    <>
      {/* Premium Deep Mesh Background */}
      <div className="min-h-[88vh] w-full bg-[#0B0F19] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#0B0F19] to-[#05070B] flex items-center justify-center px-4 py-16 relative overflow-hidden">
        
        {/* Subtle Decorative Ambient Light Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/40"
        >
          {/* Header Typography Group */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-slate-100 bg-clip-text text-transparent">
              Control Gateway
            </h1>
            <p className="text-sm text-slate-400 mt-2 font-medium">
              Provide administrator authorizations below
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field Panel */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block ml-1">
                Email Address
              </label>
              <div className="flex items-center bg-slate-950/60 border border-slate-800/80 rounded-2xl px-4 py-3.5 focus-within:border-indigo-500/80 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all duration-300">
                <FiMail className="text-slate-500 text-lg transition-colors focus-within:text-indigo-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full ml-3 text-slate-100 text-sm outline-none placeholder-slate-600"
                />
              </div>
            </div>

            {/* Password Field Panel */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block ml-1">
                Security Key
              </label>
              <div className="flex items-center bg-slate-950/60 border border-slate-800/80 rounded-2xl px-4 py-3.5 relative focus-within:border-indigo-500/80 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all duration-300">
                <FiLock className="text-slate-500 text-lg transition-colors" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-transparent w-full ml-3 text-slate-100 text-sm outline-none placeholder-slate-600 tracking-wide"
                />
                {password.length > 0 && (
                  <button 
                    type="button" 
                    onClick={togglePassword} 
                    className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors text-xl cursor-pointer"
                  >
                    {showPass ? <HiEyeOff /> : <HiEye />}
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Sign-In Trigger Button */}
            <motion.button
              whileHover={{ scale: isFormValid && !isLoading ? 1.01 : 1 }}
              whileTap={{ scale: isFormValid && !isLoading ? 0.99 : 1 }}
              disabled={!isFormValid || isLoading}
              className={`w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl mt-6 transition-all duration-300 flex justify-center items-center cursor-pointer ${
                !isFormValid || isLoading 
                  ? "opacity-40 cursor-not-allowed shadow-none" 
                  : "hover:from-indigo-500 hover:to-blue-500 shadow-indigo-950/50"
              }`}
            >
              {isLoading ? (
                <CircularProgress size={20} style={{ color: "white" }} />
              ) : (
                "Authorize Access"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Styled Feedback Notification System */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert 
          onClose={() => setSnackOpen(false)} 
          severity={snackType} 
          elevation={0} 
          variant="filled"
          style={{
            borderRadius: "16px",
            fontWeight: "600",
            fontSize: "14px",
            background: snackType === "success" ? "#4F46E5" : "#E11D48",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          {snackMsg}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Login;