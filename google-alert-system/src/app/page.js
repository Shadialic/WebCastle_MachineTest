"use client";
import React, { useState, useEffect } from 'react';

const GoogleAuthLogin = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-100/60 to-indigo-100/60 rounded-full blur-3xl"
          style={{
            left: mousePosition.x / 15,
            top: mousePosition.y / 15,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-50/80 to-blue-50/80 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Floating Tech Elements */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10"
          style={{
            left: `${15 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          {i % 3 === 0 && (
            <div className="w-3 h-3 border border-gray-400 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
          )}
          {i % 3 === 1 && (
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          )}
          {i % 3 === 2 && (
            <div className="w-4 h-1 bg-gray-300 animate-pulse" style={{ animationDuration: '6s' }} />
          )}
        </div>
      ))}

      <div className={`max-w-md w-full space-y-8 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden group border border-gray-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
            <svg className="h-10 w-10 text-gray-700 relative z-10 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h2M16 7h2a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
            <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-blue-200 opacity-60" />
            <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-blue-200 opacity-60" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-blue-200 opacity-60" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-blue-200 opacity-60" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 tracking-tight">
            Calendar Reminder
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed font-light">
            Connect your Google Calendar to set up automated phone reminders
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200/50 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
              Sign in to get started
            </h3>
            <p className="text-gray-500 text-sm font-light">
              We'll need access to your Google Calendar to set up reminders
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full group/btn relative overflow-hidden bg-white hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300 border-2 border-gray-200 hover:border-blue-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-2 left-2 w-1 h-1 bg-blue-300 rounded-full opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-indigo-300 rounded-full opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-center relative z-10">
              <svg className="w-6 h-6 mr-3 group-hover/btn:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-base font-semibold tracking-wide">Continue with Google</span>
            </div>
          </button>

          <div className="mt-8 pt-6 border-t border-gray-200/60 relative z-10">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center tracking-tight">What you'll get:</h4>
            <div className="space-y-4">
              {[
                { text: "Automatic phone call reminders", color: "from-green-400 to-emerald-500" },
                { text: "Secure Google Calendar integration", color: "from-blue-400 to-cyan-500" }, 
                { text: "Customizable reminder timing", color: "from-indigo-400 to-purple-500" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center group/item">
                  <div className={`flex-shrink-0 w-7 h-7 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mr-4 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300 shadow-lg`}>
                    <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors duration-300 font-medium">{feature.text}</span>
                  <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="text-center text-sm text-gray-500">
          <p className="hover:text-gray-700 transition-colors duration-300 font-light">
            By signing in, you agree to our 
            <span className="font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"> terms of service</span> and 
            <span className="font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"> privacy policy</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-50/60 to-transparent blur-xl" />
      
      <div className="absolute top-8 left-8 w-8 h-8 border-2 border-gray-200 rotate-45 opacity-20" />
      <div className="absolute top-8 right-8 w-6 h-6 border border-gray-300 rounded-full opacity-20" />
      <div className="absolute bottom-8 left-8 w-4 h-4 bg-gray-200 opacity-20" />
      <div className="absolute bottom-8 right-8 w-10 h-2 bg-gradient-to-r from-gray-200 to-transparent opacity-20" />
    </div>
  );
};

export default GoogleAuthLogin;