import React from 'react'
import { Search, Home as HomeIcon, MessageSquare, ShieldCheck } from 'lucide-react'

export default function About() {
  return (
    <>
      <title>About</title>
      <div className='m-auto max-w-6xl py-24 px-5'>
        <h1 className='text-3xl font-semibold py-8 text-emerald-600'>About HassanEstate</h1>

        <div className='flex flex-col sm:flex-row gap-10'>
          <div>
            <p className='py-3 text-slate-600'>
              HassanEstate is a place to find your next home, or list a property of your own.
              Browse rentals and sales side by side, filter down to exactly what you're after,
              and view every listing with a full photo gallery.
            </p>
            <p className='py-3 text-slate-600'>
              Once you're signed in, reaching out about a place is one click away — the Contact
              Landlord button on any listing lets you message the owner directly.
            </p>
            <p className='py-3 text-slate-600'>
              Have a place to rent or sell yourself? Create an account and add your own listing
              in minutes — set the price, mark it as an offer, add photos, and it shows up in
              everyone's search right away.
            </p>
          </div>
          <img className='h-60 w-60 object-cover rounded-lg self-start' src={"https://res.cloudinary.com/ueamvju9/image/upload/v1784867161/profile-images/g0dx7fvo97xvwrcvf9as.png"} alt='HassanEstate' />
        </div>

        <div className='grid sm:grid-cols-2 gap-6 mt-14'>
          <div className='flex gap-4'>
            <Search className='text-emerald-600 shrink-0' size={28} />
            <div>
              <h3 className='font-semibold text-slate-800'>Search & filter</h3>
              <p className='text-slate-600 text-sm'>Narrow listings by rent or sale, price, parking, furnishing, and current offers.</p>
            </div>
          </div>
          <div className='flex gap-4'>
            <HomeIcon className='text-emerald-600 shrink-0' size={28} />
            <div>
              <h3 className='font-semibold text-slate-800'>List your own property</h3>
              <p className='text-slate-600 text-sm'>Create, edit, and manage your listings from your profile once you're signed in.</p>
            </div>
          </div>
          <div className='flex gap-4'>
            <MessageSquare className='text-emerald-600 shrink-0' size={28} />
            <div>
              <h3 className='font-semibold text-slate-800'>Contact landlords directly</h3>
              <p className='text-slate-600 text-sm'>Message a listing's owner right from the listing page — no extra sign-up needed.</p>
            </div>
          </div>
          <div className='flex gap-4'>
            <ShieldCheck className='text-emerald-600 shrink-0' size={28} />
            <div>
              <h3 className='font-semibold text-slate-800'>Secure sign-in</h3>
              <p className='text-slate-600 text-sm'>Sign up with email, or continue with Google — your account, your listings, secured either way.</p>
            </div>
          </div>
        </div>

        <div className='mt-14 border-t pt-10'>
          <h2 className='text-xl font-semibold text-emerald-600 mb-3'>The developer</h2>
          <p className='text-slate-600'>
            HassanEstate is built and maintained by Hassan, a Software Engineering student
            specializing in the MERN stack. It's a personal project built to explore full-stack
            development — from authentication and image uploads to search, filtering, and deployment.
          </p>
        </div>
      </div>
    </>
  )
}