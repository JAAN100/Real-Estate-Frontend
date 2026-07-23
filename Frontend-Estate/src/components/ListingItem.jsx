import React from 'react'
import { Link } from 'react-router-dom'
import {MapPin} from 'lucide-react'
export default function ListingItem({ listing }) {
  
    return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full h-full sm:w-[250px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="Listing-Cover" 
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
            <div className='p-3 flex flex-col gap-2 mt-5'>
                <p className='text-lg font-semibold text-emerald-700 truncate'>{listing.name}</p>
                <div className='flex items-center gap-1'>
                   <MapPin  className='text-emerald-500 h-4 w-4'/>
                   <p className='truncate text-sm text-gray-700 w-full'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                <p className='text-slate-500 mt-2 font-semibold '>
                    ${listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                </p>
                <div className='flex gap-6'>
                    <p className='font-semibold text-xs text-emerald-600'>
                        {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
                    </p>
                    <p className='font-semibold text-xs text-emerald-600'>                        
                        {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
                    </p>
                </div>
            </div>
        </Link>
    </div>
  )
}
