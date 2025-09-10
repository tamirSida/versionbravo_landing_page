"use client";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [expandedAccelerator, setExpandedAccelerator] = useState(false);
  const [expandedAlphaBet, setExpandedAlphaBet] = useState(false);
  const acceleratorRef = useRef<HTMLDivElement>(null);
  const alphaBetRef = useRef<HTMLDivElement>(null);

  const handleToggle = (type: 'accelerator' | 'alphaBet') => {
    if (type === 'accelerator') {
      setExpandedAccelerator(!expandedAccelerator);
      if (!expandedAccelerator) {
        setTimeout(() => {
          acceleratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    } else {
      setExpandedAlphaBet(!expandedAlphaBet);
      if (!expandedAlphaBet) {
        setTimeout(() => {
          alphaBetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
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
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="Version Bravo Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <div>
                  <h1 className="text-black text-2xl font-bold" style={{ fontFamily: "'Gunplay', sans-serif" }}>VERSION BRAVO</h1>
                  <p className="text-blue-600 text-sm font-semibold tracking-wider">FRONTLINE TO FOUNDERS</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6 text-blue-700 text-sm font-bold tracking-wider">
                <a href="https://alphabet.versionbravo.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors">ALPHA-BET PROGRAM</a>
                <span>|</span>
                <span>ACCELERATOR</span>
                <span>|</span>
                <span>CONTACT</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="relative">
          
          <div className="mx-auto max-w-7xl py-16">
            {/* Hero Section */}
            <div className="relative flex min-h-[500px]">
              {/* Left side - Content */}
              <div className="mx-auto md:mx-0 md:py-12 flex flex-col justify-center max-w-lg">
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
                    <div className="text-4xl font-semibold xs:text-5xl lg:text-6xl">
                      <div className="inline-block text-black" style={{ fontFamily: "'Gunplay', sans-serif" }}>Version Bravo</div>
                    </div>
                    <div className="text-xl font-semibold text-blue-600 mt-1">Frontline to Founders</div>
                  </div>
                </div>
                
                <div className="max-w-lg">
                  <h2 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Version Bravo is an education, acceleration, and venture capital platform providing end-to-end support to Combat Veteran Founders from the U.S. and Israel. We offer two distinct, sequential programs, Alpha-Bet and Version Bravo Accelerator, designed to meet veterans exactly where they are on their entrepreneurial journey.
                  </p>
                </div>
                
              </div>

              {/* Right side - Hero Image */}
              <div className="absolute bottom-0 right-0 top-0 z-0 hidden w-[45vw] md:block">
                {/* Hero Image */}
                <div className="h-full w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/hero.png"
                    alt="Version Bravo - Combat Veterans to Founders"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4">


            <hr className="border-gray-300 mb-12" />

            {/* Application Information */}
            <div className="mb-16">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Version Bravo Accelerator */}
                <div ref={acceleratorRef} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Version Bravo Accelerator</h3>
                  <p className="text-blue-600 mb-4 font-semibold">For the High-Growth Startup</p>
                  
                  <div className="mb-6 text-sm text-gray-600">
                    <div className="mb-1">Launch: March 2026</div>
                    <div className="mb-1">Applications: December 2025</div>
                  </div>
                  
                  <button 
                    onClick={() => handleToggle('accelerator')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-4 flex items-center"
                  >
                    {expandedAccelerator ? 'Show Less' : 'Read More'}
                    <i className={`fas fa-chevron-${expandedAccelerator ? 'up' : 'down'} ml-2 transition-transform duration-200`}></i>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedAccelerator ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-gray-50 rounded p-4 text-gray-700 text-sm leading-relaxed">
                      A venture accelerator investing exclusively in startups founded by elite U.S. and Israeli special operations veterans. The Version Bravo Accelerator is our elite program for early-stage, venture-track companies ready to scale. The 10-week program provides direct investment, targeted mentorship from leading entrepreneurs, and direct access to a network of investors and industry experts. The experience starts and ends with two immersive, two-week bootcamps - one in Israel and one in the U.S.
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-colors" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                    Get Notified
                  </button>
                </div>

                {/* Alpha-Bet Program */}
                <div ref={alphaBetRef} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Alpha-Bet School</h3>
                  <p className="text-blue-600 mb-4 font-semibold">For the Aspiring Founder</p>
                  
                  <div className="mb-6 text-sm text-gray-600">
                    <div className="mb-1">Launch: November 2025</div>
                    <div className="mb-1">Applications: Open Now</div>
                  </div>
                  
                  <button 
                    onClick={() => handleToggle('alphaBet')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-4 flex items-center"
                  >
                    {expandedAlphaBet ? 'Show Less' : 'Read More'}
                    <i className={`fas fa-chevron-${expandedAlphaBet ? 'up' : 'down'} ml-2 transition-transform duration-200`}></i>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedAlphaBet ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-gray-50 rounded p-4 text-gray-700 text-sm leading-relaxed">
                      Alpha-Bet is the first step in the Version Bravo journey. The program is purpose-built for combat veterans at the very start of their entrepreneurial journey, whether they have a business idea or are starting from a blank slate. This 10-week online entrepreneurship school provides a hands-on roadmap from concept to company, featuring expert-led workshops, collaborative projects, and culminating in a final pitch to real investors. Our curriculum ranges from ideation strategies to customer discovery to storytelling and business plan formulation.
                    </div>
                  </div>
                  
                  <a href="https://alphabet.versionbravo.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-colors text-center" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                    Alpha-Bet Website
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t-4 border-blue-600 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-black font-bold mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>MISSION COMMAND</h4>
                <div className="text-gray-700 text-sm space-y-2">
                  <div>Combat Veteran Entrepreneurs</div>
                  <div>U.S. & Israel Operations</div>
                  <div>End-to-End Support Platform</div>
                </div>
              </div>
              <div>
                <h4 className="text-black font-bold mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>PROGRAMS</h4>
                <div className="text-gray-700 text-sm space-y-2">
                  <div><a href="https://alphabet.versionbravo.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Alpha-Bet Entrepreneurship School</a></div>
                  <div>Version Bravo Accelerator</div>
                  <div>Venture Capital Support</div>
                </div>
              </div>
              <div>
                <h4 className="text-black font-bold mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>INTEL & COMMS</h4>
                <div className="text-gray-700 text-sm space-y-2">
                  <div>Program Updates</div>
                  <div>Application Status</div>
                  <div>Mission Briefings</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 mt-8 pt-6 text-center">
              <p className="text-gray-600 text-sm" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                VERSION BRAVO © 2025 | FRONTLINE TO FOUNDERS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
