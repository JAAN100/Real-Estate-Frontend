import React, { useState, useEffect} from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { Menu, X, Search, Landmark } from "lucide-react";
import { useSelector } from "react-redux";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const UrlParams = new URLSearchParams(window.location.search);
    UrlParams.set("searchTerm", searchTerm);
    const searchQuery = UrlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const searchQuery = UrlParams.get("searchTerm");
    if(searchQuery) {
      setSearchTerm(searchQuery);
    }
  },[location.search])
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Navbar */}
        <div className="flex h-16 flex-wrap items-center justify-between">
          {/* Logo */}
         <NavLink to="/" className="cursor-pointer">
          <h1 className="text-2xl font-bold text-emerald-600">
            <Landmark className="inline h-6 w-6 pb-1 text-emerald-600" />
            Hassan<span className="text-gray-900">Estate</span>
          </h1>
          </NavLink>
          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 justify-center px-8 lg:flex">
            <div className="relative w-full max-w-lg">
              <form onSubmit={handleSubmit}>
                <button type="submit">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </button>

                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search properties..."
                  className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none"
                />
              </form>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <NavLink
              to="/"
              className="font-medium text-gray-700 hover:text-emerald-600"
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="font-medium text-gray-700 hover:text-emerald-600"
            >
              About
            </NavLink>

            <NavLink to="/profile">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </div>
              ) : (
                <p className="rounded-full bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700">
                  Sign In
                </p>
              )}
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
        <form onSubmit={handleSubmit}>
          <div className="pb-4 lg:hidden">
            <div className="relative">
              <button type="submit">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </button>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search properties..."
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="space-y-4 border-t border-gray-200 py-4 lg:hidden">
            <NavLink
              to="/"
              className="block font-medium text-gray-700 hover:text-emerald-600"
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="block font-medium text-gray-700 hover:text-emerald-600"
            >
              About
            </NavLink>

            <NavLink to="/profile" className="block font-medium text-gray-700 hover:text-emerald-600">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </div>
              ) : (
                <p className="block rounded-lg bg-emerald-600 px-4 py-2 text-center text-white hover:bg-emerald-700">
                  Sign In
                </p>
              )}
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}