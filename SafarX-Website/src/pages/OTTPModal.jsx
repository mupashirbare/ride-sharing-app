import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ✅ Your existing Navbar

const OTTPModal = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendAvailable, setResendAvailable] = useState(false);

  const phone = state?.phone || '';

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setResendAvailable(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 6) {
      alert('OTP Verified!');
      navigate('/driver/Register'); // Change to real route
    }
  };

  const handleResendOTP = () => {
    // Implement your resend logic here
    alert('OTP resent to ' + phone);
    setTimer(60);
    setResendAvailable(false);
  };

  return (
    <>
      <Navbar />

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 pt-20 sm:pt-0">
        <div className="bg-white dark:bg-gray-800 w-full max-w-md mx-4 sm:mx-0 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6 animate-fadeIn">
          {/* Title */}
          <h2 className="text-2xl font-bold text-green-600 text-center">Verify Code</h2>

          {/* Subtitle */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Enter the 6-digit OTP sent to <span className="font-medium">{phone}</span>
          </p>

          {/* OTP input */}
          <input
            type="text"
            maxLength={6}
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-lg text-center tracking-widest text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Verify + Back Buttons */}
          <div className="flex justify-between gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-1/2 py-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Back
            </button>
            <button
              onClick={handleVerify}
              className="w-1/2 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Verify
            </button>
          </div>

          {/* Countdown + Resend */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {resendAvailable ? (
              <button
                onClick={handleResendOTP}
                className="text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <>Resend available in <span className="font-semibold">{timer}s</span></>
            )}
          </div>

         
        </div>
      </div>
    </>
  );
};

export default OTTPModal;
