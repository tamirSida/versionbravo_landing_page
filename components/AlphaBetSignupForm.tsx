'use client';

import { useState } from 'react';

interface AlphaBetSignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlphaBetSignupForm({ isOpen, onClose }: AlphaBetSignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    verifyEmail: '',
    countryOfService: '',
    howDidYouHear: ''
  });
  
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Check if emails match
  const emailsMatch = formData.email && formData.verifyEmail && formData.email === formData.verifyEmail;
  const showEmailError = formData.verifyEmail && !emailsMatch;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear email error when user starts typing
    if (field === 'email' || field === 'verifyEmail') {
      setEmailError('');
    }
    
    // Clear submit errors
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) {
      setSubmitError('Full name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      setSubmitError('Email is required');
      return;
    }
    
    if (!formData.verifyEmail.trim()) {
      setSubmitError('Please verify your email');
      return;
    }
    
    if (!emailsMatch) {
      setEmailError('Emails do not match');
      return;
    }
    
    if (!formData.countryOfService.trim()) {
      setSubmitError('Country of service is required');
      return;
    }
    
    if (!formData.howDidYouHear.trim()) {
      setSubmitError('Please tell us how you heard about Alpha-Bet');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit-alphabet-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          countryOfService: formData.countryOfService.trim(),
          howDidYouHear: formData.howDidYouHear.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        verifyEmail: '',
        countryOfService: '',
        howDidYouHear: ''
      });

      // Auto-close after success
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 2000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold" style={{ fontFamily: "'Gunplay', sans-serif" }}>
            Get Notified - Alpha-Bet
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors cursor-pointer disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {submitSuccess ? (
            <div className="text-center py-8">
              <i className="fas fa-check-circle text-4xl text-green-500 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                We&apos;ll notify you when applications for the next Alpha-Bet cohort open.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                Be the first to know when applications open for the next Alpha-Bet cohort. 
                We&apos;ll send you an email notification with all the details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Verify Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verify Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.verifyEmail}
                    onChange={(e) => handleInputChange('verifyEmail', e.target.value)}
                    placeholder="Re-enter your email"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      showEmailError ? 'border-red-500' : emailsMatch ? 'border-green-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {showEmailError && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                      <i className="fas fa-exclamation-circle text-xs"></i>
                      <span>Emails do not match</span>
                    </div>
                  )}
                  {emailsMatch && (
                    <div className="flex items-center gap-1 mt-1 text-green-600 text-xs">
                      <i className="fas fa-check-circle text-xs"></i>
                      <span>Emails match</span>
                    </div>
                  )}
                </div>

                {/* Country of Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country of Service *
                  </label>
                  <input
                    type="text"
                    value={formData.countryOfService}
                    onChange={(e) => handleInputChange('countryOfService', e.target.value)}
                    placeholder="e.g., United States, Israel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* How did you hear about the program */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How did you hear about Alpha-Bet? *
                  </label>
                  <textarea
                    value={formData.howDidYouHear}
                    onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                    placeholder="Tell us how you discovered Alpha-Bet..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="flex items-center gap-2 text-red-700 text-sm">
                      <i className="fas fa-exclamation-circle"></i>
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !emailsMatch || Object.values(formData).some(v => !v.trim())}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 transition-colors"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Notify Me'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}