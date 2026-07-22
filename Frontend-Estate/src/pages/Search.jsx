import {useState , useEffect} from 'react'
import {useNavigate} from "react-router-dom"
export default function Search() {
    const navigate = useNavigate();
    const [sideBarData , setSideBarData] = useState({
        searchTerm : "",
        type : 'all',
        parking : false,
        furnished : false,
        offer : false,
        sort : 'priceAsc',
        order : 'asc'
    });    
    const [loading , setLoading] = useState(false);
    const [listings , setListings] = useState([]);
    console.log(listings);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTermFromUrl = params.get('searchTerm');
        const typeFromUrl = params.get('type');
        const parkingFromUrl = params.get('parking');
        const furnishedFromUrl = params.get('furnished');
        const offerFromUrl = params.get('offer');
        const sortFromUrl = params.get('sort');
        const orderFromUrl = params.get('order');
        if(searchTermFromUrl || 
            typeFromUrl || 
            parkingFromUrl || 
            furnishedFromUrl || 
            offerFromUrl || 
            sortFromUrl || 
            orderFromUrl){
                setSideBarData({
                    searchTerm : searchTermFromUrl || "",
                    type : typeFromUrl || 'all',
                    parking : parkingFromUrl === 'true' ? true : false,
                    furnished : furnishedFromUrl === 'true' ? true : false,
                    offer : offerFromUrl === 'true' ? true : false,
                    sort : sortFromUrl || 'created_at',
                    order : orderFromUrl || 'desc'
                });  
            }
            const fetchListing = async () => {
                try {
                    setLoading(true);
                    const searchQuery = params.toString();
                    const res = await fetch(`/api/listing/get?${searchQuery}`);
                    const data = await res.json();                    
                    setListings(data);
                    
                }catch(err){
                }finally{
                    setLoading(false);
                }
            }
            fetchListing();
    } , [location.search]);
    
    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSideBarData({...sideBarData , type: e.target.id});
        }
        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBarData , searchTerm: e.target.value});
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideBarData({...sideBarData , [e.target.id]: e.target.checked || e.target.checked === 'true'?
                true : false
            });
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split("_")[0] || 'created_at';
            const order = e.target.value.split("_")[1] || 'desc';
            setSideBarData({...sideBarData , sort: sort , order: order});
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const UrlParams = new URLSearchParams();
        UrlParams.set('searchTerm' , sideBarData.searchTerm);
        UrlParams.set('type' , sideBarData.type);
        UrlParams.set('parking' , sideBarData.parking);
        UrlParams.set('furnished' , sideBarData.furnished);
        UrlParams.set('offer' , sideBarData.offer);
        UrlParams.set('sort' , sideBarData.sort);
        UrlParams.set('order' , sideBarData.order);
        const searchQuery = UrlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className="flex flex-col md:flex-row gap-4">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold" htmlFor="searchTerm">Search Term:</label>
                    <input type="text" id="searchTerm" 
                    onChange={handleChange}
                    value={sideBarData.searchTerm}
                    placeholder="Search..." 
                    className="border p-3 rounded-lg w-full 
                    focus:border-emerald-500 focus:outline-none" />
                </div>   
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    <label htmlFor="propertyType" className="font-semibold">Type:</label>
                    <div className="flex gap-2 ">
                        <input type="checkbox" id="all" className="w-5" 
                        onChange={handleChange}
                        checked={sideBarData.type === 'all'}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" id="rent" className="w-5" 
                        onChange={handleChange}
                        checked={sideBarData.type === 'rent'}
                        />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" id="sale" className="w-5"
                        onChange={handleChange}
                        checked={sideBarData.type === 'sale'}
                        />
                        <span>Sale</span>
                    </div>    
                    <div className="flex gap-2 ">
                        <input type="checkbox" id="offer" className="w-5" 
                            onChange={handleChange}
                            checked={sideBarData.offer}
                        />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    <label htmlFor="propertyType" className="font-semibold  ">Amenities:</label>
                    <div className="flex gap-2 ">
                        <input type="checkbox" id="parking" className="w-5"
                            onChange={handleChange}
                            checked={sideBarData.parking}
                        />
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" id="furnished" className="w-5" 
                            onChange={handleChange}
                            checked={sideBarData.furnished}
                        />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    <label htmlFor="sort_order" className="font-semibold">Sort:</label>
                    <select id="sort_order" className="border p-3 rounded-lg"
                        onChange={handleChange}
                        defaultValue={'created_at_desc'}
                    >
                        <option value="regularPrice_asc">Price: Low to High</option>
                        <option value="regularPrice_desc">Price: High to Low</option>
                        <option value="createdAt_asc">Date: Oldest First</option>
                        <option value="createdAt_desc">Date: Newest First</option>
                    </select>
                </div>
                <button className='bg-emerald-800 text-white rounded-md p-3 uppercase font-semibold hover:opacity-90'>Search</button>
            </form>
        </div>
        <div className="p-7 flex"> 
            <h1 className="text-3xl font-semibold border-b-2  p-3 text-emerald-800">Listing <span className='text-black'>results:</span></h1>
        </div> 
    </div>
  )
}
