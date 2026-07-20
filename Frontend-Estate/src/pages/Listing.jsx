import {useState , useEffect , useRef} from 'react'
import { useParams } from 'react-router-dom';
import {LoaderCircle} from 'lucide-react'
import {Swiper , SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import {FaShare , FaMapMarkerAlt , FaBed , FaToilet , FaParking , FaChair}  from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
import 'swiper/css/bundle';
export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState({});
    const [loading, setLoading] = useState(true);
    const [Clipboard, setClipboard] = useState(false);
    const { listingId } = useParams();
    const [error, setError] = useState(null);
    const [contactClient, setContactClient] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const contactRef = useRef(null);
    useEffect(() => {
    const fetchListingData = async () => {
        try {
            setLoading(true);
          const response = await fetch(`/api/listing/get/${listingId}` , {
            method: "GET"
          });
          const data = await response.json();
          setLoading(false);
            setError(null);
            if (data.success == false) {
                setError("Failed to fetch listing data: " + data.message);
                return;
            }
            setListing(data);
            setError(null);
        } catch (error) {
            setLoading(false);
            setError(error);
        }

    };
    fetchListingData();
    }, [listingId]);
    useEffect(() => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [contactClient]);
  return (
    <main>  
     {loading && <LoaderCircle className='animate-spin w-50 h-50 m-auto mt-100'/>}
     {error && <div className='text-red-500 text-center mt-10'>{error}</div>}
     {listing && !loading && !error && (
       <div>
        <Swiper navigation>
            {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                    <img className='object-cover w-full h-[500px]' src={url} alt="" />
                    {/* {<div className='h-[500px]' style={{ background: `url(${url}) center no-repeat` , backgroundSize: 'cover' }}>
                    </div>} */}
                </SwiperSlide>
            ))}
        </Swiper>
        <div className='fixed top-[13%] right-[5%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare title='Copy the Link' className='text-slate-500'  
                onClick={()=>{
                    navigator.clipboard.writeText(window.location.href);
                    setClipboard(true);
                    setTimeout(()=>{
                        setClipboard(false);
                    }, 2000);
                }}/>
        </div>
          {(
            Clipboard && 
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 text-slate-500' >
                Link Copied
            </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-5  gap-3'>
                <p className='text-2xl font-semibold'>
                    {listing.name} - {' '}
                    {
                        listing.offer?
                        listing.discountedPrice.toLocaleString('en-US' , {
                            style: 'currency',
                            currency: 'USD'
                        }):
                        listing.regularPrice.toLocaleString('en-US' ,{
                            style: 'currency',
                            currency: 'USD'
                        })
                    }
                    {listing.type === 'rent' && ' / Month'}
                </p>
                <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
                    <FaMapMarkerAlt className='text-green-500'/> {listing.address}   
                </p>
                <div className='flex gap-3'>
                    <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {
                        listing.offer && (
                            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                ${+listing.regularPrice - +listing.discountedPrice} Discount
                            </p>
                        )
                    }
                </div>
                <p className='text-slate-800 text-sm'>
                    <span className='text-black font-semibold text-lg'>Description - {' '} </span> 
                    {listing.description}
                </p>
                <ul className='flex flex-wrap gap-4 text-green-900 text-sm sm:gap-6 font-semibold'>
                    <li className='flex items-center whitespace-nowrap gap-1'>
                        <FaBed className='text-lg'/>
                       {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom`}
                    </li>
                   <li className='flex items-center gap-1 whitespace-nowrap'>
                        <FaToilet className='text-lg'/>
                       {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom`}
                    </li>
                   <li className='flex items-center gap-1 whitespace-nowrap'>
                        <FaParking className='text-lg'/>
                       {listing.parking ? 'Parking Available' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap'>
                        <FaChair className='text-lg'/>
                       {listing.furnished ? `Furnished` : `UnFurnished`}
                    </li>
                </ul>
                {currentUser && listing.userRef !== currentUser._id && !contactClient && 
                  <div className='flex flex-col gap-3'>  
                    <button className='uppercase mt-2 p-2 bg-slate-900 rounded-md text-white hover:opacity-80' onClick={() => setContactClient(true)}>Contact Landlord</button>
                </div>
                }
                {contactClient && (<Contact ref={contactRef} listing={listing} />)}
            </div>
       </div>
     )}
     </main> 
  )
}
