import {React , useState , useRef} from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, X, Search, Landmark} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Navbar */}
        <div className="flex flex-wrap h-16 items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-emerald-600">
            <Landmark className="inline pb-1 h-6 w-6 text-emerald-600" />
            Hassan<span className="text-gray-900">Estate</span>
          </h1>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 justify-center px-8 lg:flex">
            <div className="relative w-full max-w-lg">
             <button onClick={()=> inputRef.current.focus()}>
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </button>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search properties..."
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <NavLink 
              to="/" 
              className="font-medium text-gray-700 hover:text-emerald-600 "
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="font-medium text-gray-700 hover:text-emerald-600"
            >
              About
            </NavLink>

            <NavLink
              to="/sign-in"
              className="rounded-full bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
            >
              Sign In
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="pb-4 lg:hidden">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="space-y-4 border-t border-gray-200 py-4 lg:hidden">
            <NavLink
              to="/"
              className="block font-medium text-gray-700 hover: text-emerald-600 "
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="block font-medium text-gray-700 hover:text-emerald-600"
            >
              About
            </NavLink>

            <NavLink
              to="/sign-in"
              className="block rounded-lg bg-emerald-600 px-4 py-2 text-center text-white hover:bg-emerald-700"
            >
              Sign In
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}