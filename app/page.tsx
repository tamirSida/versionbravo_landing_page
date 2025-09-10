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
          
          <div className="mx-auto max-w-7xl py-16">
            {/* Hero Section */}
            <div className="relative flex min-h-[500px]">
              {/* Left side - Content */}
              <div className="mx-auto md:mx-0 md:py-12 flex flex-col justify-center max-w-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/logo.png"
                    alt="Version Bravo Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                    priority
                  />
                  <div className="text-4xl font-semibold xs:text-5xl lg:text-6xl">
                    <div className="inline-block text-blue-600" style={{ fontFamily: "'Gunplay', sans-serif" }}>Version Bravo</div>
                  </div>
                </div>
                
                <div className="mt-5 max-w-md">
                  <div className="text-2xl font-semibold text-black">Frontline to Founders.</div>
                  <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    End-to-end support for Combat Veteran Entrepreneurs from the U.S. and Israel.
                  </p>
                </div>
                
                <button className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 text-xl font-semibold text-white hover:bg-blue-700 transition-colors max-w-fit" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                  Apply to Alpha-Bet
                </button>
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
            {/* Our Mission */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: "'Gunplay', sans-serif" }}>Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Version Bravo is an education, acceleration, and venture capital platform providing end-to-end support to Combat Veteran Founders from the U.S. and Israel. We offer two distinct, sequential programs, Alpha-Bet and Version Bravo Accelerator, designed to meet veterans exactly where they are on their entrepreneurial journey.
              </p>
            </div>

            {/* Programs Overview */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Alpha-Bet Program */}
              <div className="bg-white border-2 border-blue-500 p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Alpha-Bet Entrepreneurship School</h3>
                  <div className="w-full h-0.5 bg-blue-500 mb-4"></div>
                </div>
                <p className="text-blue-600 mb-4 font-bold">For the Aspiring Founder.</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Alpha-Bet is the first step in the Version Bravo journey. The program is purpose-built for combat veterans at the very start of their entrepreneurial journey, whether they have a business idea or are starting from a blank slate. This 10-week online entrepreneurship school provides a hands-on roadmap from concept to company, featuring expert-led workshops, collaborative projects, and culminating in a final pitch to real investors. Our curriculum ranges from ideation strategies to customer discovery to storytelling and business plan formulation.
                </p>
              </div>

              {/* Version Bravo Accelerator */}
              <div className="bg-white border-2 border-blue-500 p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>Version Bravo Accelerator</h3>
                  <div className="w-full h-0.5 bg-blue-500 mb-4"></div>
                </div>
                <p className="text-blue-600 mb-4 font-bold">For the High-Growth Startup.</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A venture accelerator investing exclusively in startups founded by elite U.S. and Israeli special operations veterans. The Version Bravo Accelerator is our elite program for early-stage, venture-track companies ready to scale. The 10-week program provides direct investment, targeted mentorship from leading entrepreneurs, and direct access to a network of investors and industry experts. The experience starts and ends with two immersive, two-week bootcamps - one in Israel and one in the U.S.
                </p>
              </div>
            </div>

            <hr className="border-gray-300 mb-12" />

            {/* Application Information */}
            <div className="mb-16">
              <p className="text-gray-700 mb-6">
                Cohort 5 of Version Bravo Accelerator will launch in March 2026 with applications being accepted in December 2025.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 mb-8 font-semibold transition-colors" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                Click Here to be notified when Applications for Cohort 5 of the Version Bravo Accelerator opens.
              </button>
              
              <p className="text-gray-700 mb-4">
                The new website is under construction and will launch soon. In the meantime, if you are a combat veteran and an aspiring entrepreneur, please consider applying for our Alpha-Bet Entrepreneurship School which launches on October 16th, 2025.
              </p>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                Apply to Alpha-Bet
              </button>
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
