import {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {LoaderCircle} from 'lucide-react'
import {Swiper , SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
export default function Listing() {
    const [listing, setListing] = useState({});
    const [loading, setLoading] = useState(true);
    const { listingId } = useParams();
    const [error, setError] = useState(null);
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
    
  return (
    <main>  
     {loading && <LoaderCircle className='animate-spin w-50 h-50 m-auto mt-100'/>}
     {error && <div className='text-red-500 text-center mt-10'>{error}</div>}
     {listing && !loading && !error && (
       <>
        <Swiper   modules={[Navigation]} navigation>
            {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                    <div className='h-[500px]' style={{ background: `url(${url}) center no-repeat` , backgroundSize: 'cover' }}>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
       </>
     )}
     </main> 
  )
}
