import { useState , useEffect } from 'react';
import {Link} from 'react-router-dom'
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import {Swiper , SwiperSlide} from 'swiper/react';
import {Loader, LoaderCircle} from "lucide-react";
import ListingItem from '../components/ListingItem';
import Footer from '../components/Footer';
import 'swiper/css/bundle'
export default function Home() {
  const [offerListing , setOfferListings] = useState([]);
  const [offerLoader , setOfferLoader] = useState(false);
  const [salesListing , setSaleListings] = useState ([]);
  const [rentListing , setRentListings] = useState([]);
 
  SwiperCore.use([Navigation]);
  useEffect(()=>{
    const fetchOfferListing = async()=>{
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        if(data.success === false){
          return;
        }
        setOfferListings(data);
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListing = async()=>{
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        if(data.success === false){
          return;
        }
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSalesListing = async()=>{
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        if(data.success === false){
          return;
        }
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListing();
    fetchRentListing();
    fetchSalesListing();
  },[])
  return (
    <>
      <div>
        <title>Home</title>
        {/* {Top} */}
        <div className='bg-slate-300 w-full'>
          <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl sm:mx-auto'>
            <h1 className='text-emerald-700 font-bold text-3xl lg:text-6xl'>Find you next <span className='text-emerald-300'>perfect</span><br />place with ease</h1>
            <div className='text-slate-500 text-xs sm:text-sm'>
              Hassan Estate is the best place to find you next 
              perfect place to live.
              <br />
              We have wide rang of properties for you to choose from.
            </div>
            <Link to={"/search"} className='font-semibold text-xs sm:text-sm text-slate-900 hover:underline hover:opacity-70'>
              Let's Start now...
            </Link>
          </div>
        </div>
        {/* {Mid Section} */}
          {offerLoader && <LoaderCircle className='animate-spin text-emerald-700 m-auto mt-10 w-28 h-28'/>}
          <Swiper navigation>
          {offerListing && offerListing.length > 0 && offerListing.map((listing)=>(      
              <SwiperSlide  key={listing._id}>    
                  <div
                    className="h-[500px]"
                    style={{
                      backgroundImage: `url(${listing.imageUrls[0]})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
              </SwiperSlide>
          ))}
          </Swiper>
          <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
            {offerListing && offerListing.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-emerald-600'>Recent Offers</h2>
                  <Link className='text-sm text-slate-700 hover:opacity-70' to={'/search?offer=true'}>See more Option...</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    offerListing.map((listing)=>(
                      <div key={listing._id} className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                        <ListingItem listing ={listing}/>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>

          <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
            {rentListing && rentListing.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-emerald-600'>Recent Rents</h2>
                  <Link className='text-sm text-slate-700 hover:opacity-70' to={'/search?type=rent'}>See more Option...</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    rentListing.map((listing)=>(
                    <div key={listing._id} className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                        <ListingItem listing ={listing}/>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>  


          <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
            {salesListing && salesListing.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-emerald-600'>Recent Sales</h2>
                  <Link className='text-sm text-slate-700 hover:opacity-70' to={'/search?type=sale'}>See more Option...</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    salesListing.map((listing)=>(
                    <div key={listing._id} className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                        <ListingItem listing ={listing}/>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>     
      </div>
      <Footer/>
    </>
  )
}
