'use client';

import { useState } from 'react';

interface AcceleratorSignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AcceleratorSignupForm({ isOpen, onClose }: AcceleratorSignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneCountryCode: '+1',
    phone: '',
    email: '',
    verifyEmail: '',
    nationServed: '',
    classServed: '',
    referral: '',
    entrepreneurStatus: '',
    entrepreneurStatusOther: ''
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
    
    if (!formData.phone.trim()) {
      setSubmitError('Phone number is required');
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
    
    if (!formData.nationServed.trim()) {
      setSubmitError('Nation served is required');
      return;
    }
    
    if (!formData.classServed.trim()) {
      setSubmitError('Class served is required');
      return;
    }
    
    if (!formData.entrepreneurStatus.trim()) {
      setSubmitError('Entrepreneur status is required');
      return;
    }
    
    if (formData.entrepreneurStatus === 'Other' && !formData.entrepreneurStatusOther.trim()) {
      setSubmitError('Please specify your entrepreneur status');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit-accelerator-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: `${formData.phoneCountryCode}${formData.phone.trim()}`,
          email: formData.email.trim(),
          nationServed: formData.nationServed.trim(),
          classServed: formData.classServed.trim(),
          referral: formData.referral.trim(),
          entrepreneurStatus: formData.entrepreneurStatus === 'Other' 
            ? formData.entrepreneurStatusOther.trim() 
            : formData.entrepreneurStatus.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        fullName: '',
        phoneCountryCode: '+1',
        phone: '',
        email: '',
        verifyEmail: '',
        nationServed: '',
        classServed: '',
        referral: '',
        entrepreneurStatus: '',
        entrepreneurStatusOther: ''
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
            Get Notified - Vetted Accelerator
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
                We&apos;ll notify you when applications for the next Vetted Accelerator cohort open.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                Be the first to know when applications open for the next Vetted Accelerator cohort. 
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

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.phoneCountryCode}
                      onChange={(e) => handleInputChange('phoneCountryCode', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-24"
                      disabled={isSubmitting}
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+972">🇮🇱 +972</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+32">🇧🇪 +32</option>
                      <option value="+41">🇨🇭 +41</option>
                      <option value="+43">🇦🇹 +43</option>
                      <option value="+45">🇩🇰 +45</option>
                      <option value="+46">🇸🇪 +46</option>
                      <option value="+47">🇳🇴 +47</option>
                      <option value="+358">🇫🇮 +358</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+64">🇳🇿 +64</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+82">🇰🇷 +82</option>
                      <option value="+65">🇸🇬 +65</option>
                    </select>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Phone number"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
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

                {/* Nation Served */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nation Served *
                  </label>
                  <input
                    type="text"
                    value={formData.nationServed}
                    onChange={(e) => handleInputChange('nationServed', e.target.value)}
                    placeholder="e.g., United States, Israel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Class Served */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Served *
                  </label>
                  <input
                    type="text"
                    value={formData.classServed}
                    onChange={(e) => handleInputChange('classServed', e.target.value)}
                    placeholder="e.g., Navy SEALs, Rangers, Paratroopers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Referral (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Referral (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.referral}
                    onChange={(e) => handleInputChange('referral', e.target.value)}
                    placeholder="Who referred you to us?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Entrepreneur Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entrepreneur Status *
                  </label>
                  <select
                    value={formData.entrepreneurStatus}
                    onChange={(e) => handleInputChange('entrepreneurStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  >
                    <option value="">Select your status</option>
                    <option value="First-time founder">First-time founder</option>
                    <option value="Serial entrepreneur">Serial entrepreneur</option>
                    <option value="Aspiring entrepreneur">Aspiring entrepreneur</option>
                    <option value="Corporate executive transitioning">Corporate executive transitioning</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  {formData.entrepreneurStatus === 'Other' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={formData.entrepreneurStatusOther}
                        onChange={(e) => handleInputChange('entrepreneurStatusOther', e.target.value)}
                        placeholder="Please specify (max 100 characters)"
                        maxLength={100}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                  )}
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
                  disabled={isSubmitting || !emailsMatch || !formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.nationServed.trim() || !formData.classServed.trim() || !formData.entrepreneurStatus.trim() || (formData.entrepreneurStatus === 'Other' && !formData.entrepreneurStatusOther.trim())}
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