import Image from "next/image";

export default function Home() {
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
                <span>ALPHA-BET PROGRAM</span>
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
          {/* Military corner brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-3 border-t-3 border-blue-500 opacity-60"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-r-3 border-t-3 border-blue-500 opacity-60"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l-3 border-b-3 border-blue-500 opacity-60"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-3 border-b-3 border-blue-500 opacity-60"></div>
          
          <div className="max-w-5xl mx-auto px-4 py-16">
            {/* Logo and Title Section */}
            <div className="text-center mb-16">
              <div className="w-32 h-32 mx-auto mb-6">
                <Image
                  src="/logo.png"
                  alt="Version Bravo Logo"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 tracking-wider" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                VERSION BRAVO
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                FRONTLINE TO FOUNDERS
              </h2>
              
              <div className="max-w-4xl mx-auto mb-8">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  End-to-end support platform for Combat Veteran Founders from the United States and Israel.
                </p>
                <p className="text-blue-700 font-semibold">
                  Two sequential programs. Two pathways to success. One mission: Transform warriors into industry leaders.
                </p>
              </div>
            </div>


            {/* Programs Overview */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Alpha-Bet Program */}
              <div className="bg-white border-2 border-green-500 p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-graduation-cap text-2xl text-green-600"></i>
                    <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Gunplay', sans-serif" }}>ALPHA-BET PROGRAM</h3>
                  </div>
                  <div className="w-full h-0.5 bg-green-500 mb-4"></div>
                </div>
                <p className="text-green-600 mb-2 font-bold tracking-wider text-sm">[ PHASE 01: FOUNDATION ]</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  10-week intensive entrepreneurship school for combat veterans beginning their civilian mission.
                </p>
                <div className="text-sm text-gray-600">
                  <div className="mb-1">→ TARGET: Aspiring Founders</div>
                  <div className="mb-1">→ DURATION: 10 Weeks</div>
                  <div>→ STATUS: Recruiting</div>
                </div>
              </div>

              {/* Version Bravo Accelerator */}
              <div className="bg-white border-2 border-blue-500 p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-rocket text-2xl text-blue-600"></i>
                    <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Gunplay', sans-serif" }}>BRAVO ACCELERATOR</h3>
                  </div>
                  <div className="w-full h-0.5 bg-blue-500 mb-4"></div>
                </div>
                <p className="text-blue-600 mb-2 font-bold tracking-wider text-sm">[ PHASE 02: ACCELERATION ]</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Elite venture capital program for high-growth companies led by special operations veterans.
                </p>
                <div className="text-sm text-gray-600">
                  <div className="mb-1">→ TARGET: Scaling Startups</div>
                  <div className="mb-1">→ FOCUS: Venture Capital</div>
                  <div>→ STATUS: Applications Q4 2025</div>
                </div>
              </div>
            </div>

            {/* Under Construction Notice */}
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <i className="fas fa-tools text-2xl text-yellow-600"></i>
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Gunplay', sans-serif" }}>PLATFORM STATUS: UNDER DEVELOPMENT</h3>
              </div>
              <div className="text-center">
                <div className="w-full bg-gray-300 h-2 mb-2">
                  <div className="bg-yellow-500 h-2" style={{ width: '75%' }}></div>
                </div>
                <p className="text-gray-700 text-sm">
                  OPERATIONAL WEBSITE LAUNCHING SOON - FULL MISSION DETAILS INCOMING
                </p>
              </div>
            </div>

            {/* Current Operations */}
            <div className="space-y-6 mb-16">
              <h3 className="text-center text-2xl font-bold text-black mb-8" style={{ fontFamily: "'Gunplay', sans-serif" }}>CURRENT OPERATIONS</h3>
              
              {/* Alpha-Bet Program */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-play-circle text-green-600"></i>
                      <span className="text-green-600 font-bold text-sm tracking-wider">ACTIVE RECRUITMENT</span>
                    </div>
                    <h4 className="text-black font-bold" style={{ fontFamily: "'Gunplay', sans-serif" }}>ALPHA-BET PROGRAM</h4>
                  </div>
                  <div className="text-gray-700 text-sm">
                    <div className="mb-1">→ LAUNCH: 16 OCT 2025</div>
                    <div>→ STATUS: Applications Open</div>
                  </div>
                  <div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-bold text-sm tracking-wider transition-colors" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                      <i className="fas fa-external-link-alt mr-2"></i>
                      APPLY NOW
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Version Bravo Accelerator */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-clock text-blue-600"></i>
                      <span className="text-blue-600 font-bold text-sm tracking-wider">STANDBY</span>
                    </div>
                    <h4 className="text-black font-bold" style={{ fontFamily: "'Gunplay', sans-serif" }}>BRAVO ACCELERATOR - COHORT 5</h4>
                  </div>
                  <div className="text-gray-700 text-sm">
                    <div className="mb-1">→ LAUNCH: MAR 2026</div>
                    <div>→ APPLICATIONS: DEC 2025</div>
                  </div>
                  <div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-bold text-sm tracking-wider transition-colors" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                      <i className="fas fa-bell mr-2"></i>
                      GET NOTIFIED
                    </button>
                  </div>
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
                  <div>Alpha-Bet Entrepreneurship School</div>
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
                VERSION BRAVO © 2025 | FRONTLINE TO FOUNDERS | CLASSIFIED: UNCLASSIFIED
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
