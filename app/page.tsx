"use client";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<'none' | 'accelerator' | 'alphaBet'>('none');
  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    nationServed: '',
    unit: '',
    hearAbout: '',
    entrepreneurshipStatus: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const acceleratorRef = useRef<HTMLDivElement>(null);
  const alphaBetRef = useRef<HTMLDivElement>(null);

  const handleToggle = (type: 'accelerator' | 'alphaBet') => {
    if (expandedCard === type) {
      setExpandedCard('none');
    } else {
      setExpandedCard(type);
      setTimeout(() => {
        if (type === 'accelerator') {
          acceleratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alphaBetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/.netlify/functions/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setShowApplicationForm(false);
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          nationServed: '',
          unit: '',
          hearAbout: '',
          entrepreneurshipStatus: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      />
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b-4 border-blue-600 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Version Bravo Logo"
                  width={40}
                  height={40}
                  className="object-contain sm:w-12 sm:h-12"
                />
                <div>
                  <h1 className="text-black text-lg sm:text-2xl font-bold" style={{ fontFamily: "'Gunplay', sans-serif" }}>VERSION BRAVO</h1>
                  <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-wider">FRONTLINE TO FOUNDERS</p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6 text-blue-700 text-sm font-bold tracking-wider">
                <a href="https://alphabet.versionbravo.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors">ALPHA-BET PROGRAM</a>
                <span>|</span>
                <button onClick={() => setShowApplicationForm(true)} className="hover:text-blue-800 transition-colors cursor-pointer">ACCELERATOR</button>
                <span>|</span>
                <button onClick={() => setShowContactModal(true)} className="hover:text-blue-800 transition-colors cursor-pointer">CONTACT</button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-blue-700 hover:text-blue-800 transition-colors p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
                <div className="flex flex-col space-y-4 text-blue-700 font-bold text-sm tracking-wider">
                  <a href="https://alphabet.versionbravo.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors py-2">
                    ALPHA-BET PROGRAM
                  </a>
                  <button onClick={() => { setShowApplicationForm(true); setMobileMenuOpen(false); }} className="hover:text-blue-800 transition-colors cursor-pointer text-left py-2">
                    ACCELERATOR
                  </button>
                  <button onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }} className="hover:text-blue-800 transition-colors cursor-pointer text-left py-2">
                    CONTACT
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Container */}
        <main className="relative">
          
          <div className="mx-auto max-w-7xl py-8 md:py-16 px-4">
            {/* Hero Section */}
            <div className="relative">
              {/* Mobile Layout */}
              <div className="md:hidden text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Image
                    src="/logo.png"
                    alt="Version Bravo Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                    priority
                  />
                  <div>
                    <div className="text-2xl font-semibold">
                      <div className="inline-block text-black" style={{ fontFamily: "'Gunplay', sans-serif" }}>Version Bravo</div>
                    </div>
                    <div className="text-base font-semibold text-blue-600">Frontline to Founders</div>
                  </div>
                </div>
                
                {/* Mobile Hero Image */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/hero.png"
                    alt="Version Bravo - Combat Veterans to Founders"
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                    priority
                  />
                </div>
                
                <div className="px-4">
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>Our Mission</h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Version Bravo is an education, acceleration, and venture capital platform providing end-to-end support to Combat Veteran Founders from the U.S. and Israel. We offer two distinct, sequential programs, Alpha-Bet and Version Bravo Accelerator, designed to meet veterans exactly where they are on their entrepreneurial journey.
                  </p>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-2 gap-8 min-h-[500px] items-center">
                {/* Left side - Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-8">
                    <Image
                      src="/logo.png"
                      alt="Version Bravo Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                      priority
                    />
                    <div>
                      <div className="text-4xl font-semibold lg:text-6xl">
                        <div className="inline-block text-black" style={{ fontFamily: "'Gunplay', sans-serif" }}>Version Bravo</div>
                      </div>
                      <div className="text-xl font-semibold text-blue-600 mt-1">Frontline to Founders</div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Version Bravo is an education, acceleration, and venture capital platform providing end-to-end support to Combat Veteran Founders from the U.S. and Israel. We offer two distinct, sequential programs, Alpha-Bet and Version Bravo Accelerator, designed to meet veterans exactly where they are on their entrepreneurial journey.
                    </p>
                  </div>
                </div>

                {/* Right side - Hero Image */}
                <div className="flex justify-center items-center">
                  <div className="w-full max-w-xl rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src="/hero.png"
                      alt="Version Bravo - Combat Veterans to Founders"
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4">


            <hr className="border-gray-300 mb-12" />

            {/* Application Information */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:items-start">
                {/* Version Bravo Accelerator */}
                <div ref={acceleratorRef} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Version Bravo Accelerator</h3>
                  <p className="text-blue-600 mb-4 font-semibold text-sm md:text-base">For the High-Growth Startup</p>
                  
                  <div className="mb-4 md:mb-6 text-sm text-gray-600">
                    <div className="mb-1">Launch: March 2026</div>
                    <div className="mb-1">Applications: December 2025</div>
                  </div>
                  
                  <button 
                    onClick={() => handleToggle('accelerator')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-4 flex items-center cursor-pointer"
                  >
                    {expandedCard === 'accelerator' ? 'Show Less' : 'Read More'}
                    <i className={`fas fa-chevron-${expandedCard === 'accelerator' ? 'up' : 'down'} ml-2 transition-transform duration-200`}></i>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedCard === 'accelerator' ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-gray-50 rounded p-3 md:p-4 text-gray-700 text-sm leading-relaxed">
                      A venture accelerator investing exclusively in startups founded by elite U.S. and Israeli special operations veterans. The Version Bravo Accelerator is our elite program for early-stage, venture-track companies ready to scale. The 10-week program provides direct investment, targeted mentorship from leading entrepreneurs, and direct access to a network of investors and industry experts. The experience starts and ends with two immersive, two-week bootcamps - one in Israel and one in the U.S.
                    </div>
                  </div>
                  
                  <button onClick={() => setShowApplicationForm(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-3 rounded font-semibold transition-colors text-sm md:text-base cursor-pointer" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                    Get Notified When Applications Launch
                  </button>
                </div>

                {/* Alpha-Bet Program */}
                <div ref={alphaBetRef} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Alpha-Bet School</h3>
                  <p className="text-blue-600 mb-4 font-semibold text-sm md:text-base">For the Aspiring Founder</p>
                  
                  <div className="mb-4 md:mb-6 text-sm text-gray-600">
                    <div className="mb-1">Launch: November 2025</div>
                    <div className="mb-1">Applications: Open Now</div>
                  </div>
                  
                  <button 
                    onClick={() => handleToggle('alphaBet')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-4 flex items-center cursor-pointer"
                  >
                    {expandedCard === 'alphaBet' ? 'Show Less' : 'Read More'}
                    <i className={`fas fa-chevron-${expandedCard === 'alphaBet' ? 'up' : 'down'} ml-2 transition-transform duration-200`}></i>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedCard === 'alphaBet' ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-gray-50 rounded p-3 md:p-4 text-gray-700 text-sm leading-relaxed">
                      Alpha-Bet is the first step in the Version Bravo journey. The program is purpose-built for combat veterans at the very start of their entrepreneurial journey, whether they have a business idea or are starting from a blank slate. This 10-week online entrepreneurship school provides a hands-on roadmap from concept to company, featuring expert-led workshops, collaborative projects, and culminating in a final pitch to real investors. Our curriculum ranges from ideation strategies to customer discovery to storytelling and business plan formulation.
                    </div>
                  </div>
                  
                  <a href="https://alphabet.versionbravo.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-3 rounded font-semibold transition-colors text-center text-sm md:text-base" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                    Alpha-Bet Website
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t-4 border-blue-600 mt-8 md:mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-center md:text-left justify-items-center">
              <div>
                <h4 className="text-black font-bold mb-3 md:mb-4 text-sm md:text-base" style={{ fontFamily: "'Gunplay', sans-serif" }}>PROGRAMS</h4>
                <div className="text-gray-700 text-sm space-y-2">
                  <div><a href="https://alphabet.versionbravo.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Alpha-Bet Entrepreneurship School</a></div>
                  <div><button onClick={() => setShowApplicationForm(true)} className="hover:text-blue-600 transition-colors cursor-pointer text-left">Version Bravo Accelerator</button></div>
                </div>
              </div>
              <div>
                <h4 className="text-black font-bold mb-3 md:mb-4 text-sm md:text-base" style={{ fontFamily: "'Gunplay', sans-serif" }}>CONTACT</h4>
                <div className="text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-envelope text-blue-600"></i>
                    <a href="mailto:info@versionbravo.com" className="hover:text-blue-600 transition-colors break-all">info@versionbravo.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 mt-6 md:mt-8 pt-4 md:pt-6 text-center">
              <p className="text-gray-600 text-xs md:text-sm" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                VERSION BRAVO © 2025 | FRONTLINE TO FOUNDERS
              </p>
            </div>
          </div>
        </footer>
        
        {/* Under Construction Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md text-center" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6">
                <i className="fas fa-hard-hat text-4xl md:text-6xl text-yellow-600 mb-4"></i>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Site Under Construction</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  The Version Bravo Accelerator website is currently under development.
                </p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-3 rounded font-semibold transition-colors text-sm md:text-base" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                  Get Notified When We Launch
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 md:px-6 py-3 rounded font-semibold transition-colors text-sm md:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowContactModal(false)}>
            <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md text-center" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6">
                <i className="fas fa-envelope text-4xl md:text-6xl text-blue-600 mb-4"></i>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Contact Us</h3>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Get in touch with the Version Bravo team
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-gray-50 p-3 md:p-4 rounded-lg">
                  <i className="fas fa-envelope text-blue-600 text-sm"></i>
                  <a href="mailto:info@versionbravo.com" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-sm md:text-base break-all">
                    info@versionbravo.com
                  </a>
                </div>
              </div>
              
              <button 
                onClick={() => setShowContactModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 md:px-6 py-3 rounded font-semibold transition-colors text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowApplicationForm(false)}>
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 md:p-8">
                <div className="mb-6 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Alpha-Bet School Application</h3>
                  <p className="text-gray-600">Join the first step in your entrepreneurial journey</p>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Nation Served */}
                  <div>
                    <label htmlFor="nationServed" className="block text-sm font-semibold text-gray-700 mb-2">Nation Served *</label>
                    <select
                      id="nationServed"
                      required
                      value={formData.nationServed}
                      onChange={(e) => setFormData({...formData, nationServed: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a nation</option>
                      <option value="United States of America">United States of America</option>
                      <option value="Israel">Israel</option>
                    </select>
                  </div>

                  {/* Unit */}
                  <div>
                    <label htmlFor="unit" className="block text-sm font-semibold text-gray-700 mb-2">What Unit did you serve in? *</label>
                    <input
                      type="text"
                      id="unit"
                      required
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <label htmlFor="hearAbout" className="block text-sm font-semibold text-gray-700 mb-2">How did you learn about VERSION BRAVO? *</label>
                    <textarea
                      id="hearAbout"
                      required
                      rows={3}
                      value={formData.hearAbout}
                      onChange={(e) => setFormData({...formData, hearAbout: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Entrepreneurship Status */}
                  <div>
                    <label htmlFor="entrepreneurshipStatus" className="block text-sm font-semibold text-gray-700 mb-2">What best describes your current status regarding entrepreneurship? *</label>
                    <select
                      id="entrepreneurshipStatus"
                      required
                      value={formData.entrepreneurshipStatus}
                      onChange={(e) => setFormData({...formData, entrepreneurshipStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select your status</option>
                      <option value="I am currently working on a business or startup.">I am currently working on a business or startup.</option>
                      <option value="I have an idea for a business I want to develop during the program.">I have an idea for a business I want to develop during the program.</option>
                      <option value="I am interested in entrepreneurship but do not have a specific idea or business yet.">I am interested in entrepreneurship but do not have a specific idea or business yet.</option>
                    </select>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <button 
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded font-semibold transition-colors"
                      style={{ fontFamily: "'Gunplay', sans-serif" }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
