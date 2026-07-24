import React from 'react';
import { Landmark } from 'lucide-react';

// lucide-react removed brand icons in v1.0, so these are small local SVGs instead
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.98H7.9V12h2.6V9.8c0-2.56 1.53-3.97 3.87-3.97 1.12 0 2.3.2 2.3.2v2.5h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.85l-.46 2.89h-2.39v6.98A10 10 0 0 0 22 12Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.6 22H1.5l8.1-9.3L1 2h7l4.9 6.3L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20Z" />
  </svg>
);

const socialLinks = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/butt___hassan/', label: 'Instagram' },
  { icon: XIcon, href: '#', label: 'X (Twitter)' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/hassan-jaan/', label: 'LinkedIn' },
];

const services = [
  'Property Buying',
  'Property Selling',
  'Property Rentals',
  'Property Management',
  'Investment Consulting',
];

export default function Footer() {
  return (
    <footer className="bg-slate-800 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 sm:p-10">
        <div className="flex flex-col items-start gap-2">
          <span className="flex items-center gap-1 font-semibold">
            <Landmark className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl">
              <span className="text-emerald-400">Hassan</span>{' '}
              <span className="text-slate-300">Estate</span>
            </h1>
          </span>
          <p className="text-slate-300 text-sm">
            Discover your dream home with Hassan Estate.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h2 className="text-emerald-400 font-semibold text-xl">Services</h2>
          <ul className="text-slate-300 text-sm flex flex-col gap-1.5">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h2 className="text-emerald-400 font-semibold text-xl">Social Media Handles</h2>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-slate-700" />

      <div className="px-6 sm:px-10 py-4">
        <p className="text-slate-400 text-xs">
          &copy; 2026 Hassan Estate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}