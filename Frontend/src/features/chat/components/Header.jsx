import { Bell, Moon, Share2, User, Menu } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-300 px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-black text-white px-2 py-1 font-bold text-xs sm:text-sm">
            ⚡
          </div>
          <div className="hidden sm:block">
            <h1 className="text-black font-bold text-base sm:text-lg">ARENA PRO</h1>
            <p className="text-xs text-gray-500">PRO TIER</p>
          </div>
          <div className="block sm:hidden">
            <h1 className="text-black font-bold text-sm">ARENA</h1>
          </div>
        </div>

        {/* Navigation Tabs - Hidden on mobile */}
        <nav className="hidden md:flex gap-4 lg:gap-8 mx-auto">
          <a href="#" className="font-bold text-black text-xs lg:text-sm">MODELS</a>
          <a href="#" className="text-gray-500 text-xs lg:text-sm">DATASETS</a>
          <a href="#" className="text-gray-500 text-xs lg:text-sm">BENCHMARKS</a>
        </nav>

        {/* Search and Controls - Search hidden on mobile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="SEARCH SYSTEM..."
              className="border border-gray-400 px-3 sm:px-4 py-2 rounded text-xs placeholder-gray-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              🔍
            </button>
          </div>

          <button className="text-gray-600 hover:text-black">
            <Bell size={18} className="sm:w-5 sm:h-5" />
          </button>

          <button className="text-gray-600 hover:text-black hidden sm:block">
            <Moon size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>

          <button className="bg-yellow-400 text-black font-bold px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-yellow-500 text-xs sm:text-sm">
            SHARE
          </button>
        </div>
      </div>
    </header>
  );
};
