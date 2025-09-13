import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Version Bravo Logo"
            width={80}
            height={80}
            className="mx-auto object-contain"
          />
        </div>
        
        <h1 className="text-6xl font-bold text-blue-600 mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "'Gunplay', sans-serif" }}>
          Mission Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for has gone dark. Let&apos;s get you back to base camp.
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-colors"
          style={{ fontFamily: "'Gunplay', sans-serif" }}
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}