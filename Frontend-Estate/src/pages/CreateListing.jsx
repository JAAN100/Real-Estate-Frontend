import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center text-3xl font-bold mt-5 my-7 text-emerald-700'>Create <span className='text-black'>Listing</span></h1>
      <form className='flex flex-col sm:flex-row gap-4' action="">
        <div className='flex flex-col gap-4 flex-1 mx-5 mt-4'>
          <input  className="border p-3 rounded-lg" maxLength={62} minLength={6} required   type="text" placeholder='Name'/>
          <textarea className="border p-3 rounded-lg" required  type="text" placeholder='Description'/>
          <input className="border p-3 rounded-lg" required  type="text" placeholder='Address'/>
          <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
              <input className='w-5' type="checkbox" id="sell" />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="checkbox" id="rent" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="checkbox" id="parking" />
              <label htmlFor="parking">Parking Spot</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="checkbox" id="furnished" />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="checkbox" id="offer" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'> 
              <input className='border p-3 rounded-lg' max={10} min={1} type="number" id="bedrooms" />
              <p>Bedrooms</p>
            </div>
            <div className='flex items-center gap-2'>
              <input className='border p-3 rounded-lg' max={10} min={1} type="number" id="bathrooms" />
              <p>Bathrooms</p>
            </div>
            <div className='flex items-center gap-2'>
              <input className='border p-3 rounded-lg' max={1000000} min={1} type="number" id="regularPrice" />
              <div className='flex flex-col items-center gap-2'>
                <p>Regular Price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
              
            </div>
            <div className='flex items-center gap-2'>
              <input className='border p-3 rounded-lg' max={1000000} min={1} type="number" id="discountedPrice" />
              <div className='flex flex-col items-center gap-2'>
                <p>Discounted Price</p>
                <span className='text-xs' >($ / month)</span>
              </div>
            </div>
          </div>
          
        </div>
        <div className='flex flex-col flex-1 gap-5 mt-5 mx-5'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first Image Will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4 items-center'>
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='images/*' multiple/>
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className="p-3 uppercase text-white bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80">Create Listing</button>
        </div>
       </form>

    </main>
  )
}
