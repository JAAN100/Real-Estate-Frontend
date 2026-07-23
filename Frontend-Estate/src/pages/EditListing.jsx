import {useState , useEffect} from 'react'
import {uploadFile} from '../components/CloudinaryUpload';
import {LoaderCircle} from 'lucide-react';
import { useNavigate , useParams} from 'react-router-dom';

export default function EditListing() {
  const [files , setFiles] = useState([]);
  const [foamData , setFormData] = useState({
    imageUrls : [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false
  });
  const [imageUploadErr , setImageUploadErr] = useState("");
  const [isUploading , setIsUploading] = useState(false);
  const [dataUploading , setDataUploading] = useState(false);
  const [successMessage , setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();  
    useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await fetch(`/api/listing/get/${id}` , {
          method: "GET"
        });
        const data = await response.json();         
        if (data.success == false) {
          setImageUploadErr("Failed to fetch listing data: " + data.message);
          return;
        }
        setFormData(data);
      } catch (error) {
        console.error("Error fetching listing data:");
      }
    };

  fetchListingData();
  }, []);


  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0 || files.length > 6) {
      setImageUploadErr("Please select between 1 and 6 images.");
      return;
    }

    setImageUploadErr("");

    try {
      setIsUploading(true);
      const urls = await Promise.all(
        files.map((file) => uploadFile(file))
      );
      if(foamData.imageUrls.length + urls.length <= 6) {
        setFormData((prevData) => ({
          ...prevData,
          imageUrls: prevData.imageUrls.concat(urls),
        }));
      }else{
        setImageUploadErr("You can only upload a maximum of 6 images.");
      }
      setIsUploading(false);
    } catch (err) {
      console.error(err);
      setImageUploadErr("Image upload Failed " + err.message);
    }
  };

  const handleRemoveImage = (index)=>{
    setFormData({
      ...foamData,
      imageUrls: foamData.imageUrls.filter((_, i) => i !== index)
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setImageUploadErr("");
    }, 5000);
  }, [imageUploadErr]);

  const handleChange = (e)=>{
    if(e.target.id === "sale" || e.target.id === "rent"){
      setFormData({
        ...foamData,
        type: e.target.id
      })
    }
    if(e.target.id === "offer" || e.target.id === "parking" || e.target.id === "furnished"){
      setFormData({
        ...foamData,
        [e.target.id]: e.target.checked
      })
    }

    if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea"){
      setFormData({
        ...foamData,
        [e.target.id]: e.target.value
      })
    }
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(foamData.imageUrls.length < 1) { 
        setImageUploadErr("You must upload at least one image before creating a listing.");
         return
      }
      if(foamData.discountedPrice > foamData.regularPrice){
        setImageUploadErr("Discounted price cannot be greater than regular price.");
        return;
      }
    try {
      setDataUploading(true);
      const response = await fetch(`/api/listing/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(foamData)
      });
      const data = await response.json();
      setDataUploading(false);
      if(data.success == false){
        setImageUploadErr("Failed to update listing: " + data.message);
        return;
      }
      
      setImageUploadErr(null);  
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
      navigate("/listing/"+ data._id);
    } catch (error) {
      setDataUploading(false);
      setImageUploadErr("Failed to create listing: " + error.message);
    }
  }


  return (
    <>
      <title>Edit-Listing</title>
      <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-center text-3xl font-bold mt-5 my-7 text-emerald-700'>Edit a <span className='text-black'>Listing</span></h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4' action="">
          <div className='flex flex-col gap-4 flex-1 mx-5 mt-4'>
            <input onChange={handleChange} value={foamData.name} id="name" className="border p-3 rounded-lg" maxLength={62} minLength={6} required   type="text" placeholder='Name'/>
            <textarea onChange={handleChange} value={foamData.description} id="description" className="border p-3 rounded-lg" required  type="text" placeholder='Description'/>
            <input onChange={handleChange} value={foamData.address} id="address" className="border p-3 rounded-lg" required  type="text" placeholder='Address'/>
            <div className='flex flex-wrap gap-6'>
              <div className='flex gap-2'>
                <input checked={foamData.type === "sale"} value={foamData.type} onChange={handleChange} className='w-5' type="checkbox" id="sale" />
                <label htmlFor="sale">Sale</label>
              </div>
              <div className='flex gap-2'>
                <input checked={foamData.type === "rent"} value={foamData.type} onChange={handleChange} className='w-5' type="checkbox" id="rent" />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className='flex gap-2'>
                <input checked={foamData.parking} onChange={handleChange}  className='w-5' type="checkbox" id="parking"/>
                <label htmlFor="parking">Parking Spot</label>
              </div>
              <div className='flex gap-2'>
                <input onChange={handleChange} checked={foamData.furnished} className='w-5' type="checkbox" id="furnished"/>
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className='flex gap-2'>
                <input onChange={handleChange} checked={foamData.offer} className='w-5' type="checkbox" id="offer"/>
                <label htmlFor="offer">Offer</label>
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex items-center gap-2'> 
                <input onChange={handleChange} value={foamData.bedrooms} className='border p-3 rounded-lg' max={10} min={1} type="number" id="bedrooms" />
                <p>Bedrooms</p>
              </div>
              <div className='flex items-center gap-2'>
                <input onChange={handleChange} value={foamData.bathrooms} className='border p-3 rounded-lg' max={10} min={1} type="number" id="bathrooms" />
                <p>Bathrooms</p>
              </div>
              <div className='flex items-center gap-2'>
                <input onChange={handleChange} value={foamData.regularPrice} className='border p-3 rounded-lg' max={10000000} min={50} type="number" id="regularPrice" />
                <div className='flex flex-col items-center gap-2'>
                  <p>Regular Price</p>
                  {foamData.type === "rent" && <span className='text-xs'>($ / month)</span>}
                </div>
                
              </div>
              {foamData.offer && (
                <div className='flex items-center gap-2'>
                  <input onChange={handleChange} value={foamData.discountedPrice} className='border p-3 rounded-lg' max={10000000} min={0} type="number" id="discountedPrice" />
                  <div className='flex flex-col items-center gap-2'>
                    <p>Discounted Price</p>
                    {foamData.type === "rent" && <span className='text-xs'>($ / month)</span>}
                  </div>
                </div>
              )}
            </div>
            
          </div>
          <div className='flex flex-col flex-1 gap-5 mt-5 mx-5'>
            <p className='font-semibold'>Images:
              <span className='font-normal text-gray-600 ml-2'>The first Image Will be the cover (max 6)</span>
            </p>
            <div className='flex gap-4 items-center'>
              <input onChange={(e)=>{setFiles([...e.target.files])}} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple/>
              <button type='button' onClick={handleFileUpload} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
              {isUploading && <LoaderCircle className='animate-spin text-green-700' />}
            </div>
              {imageUploadErr && <p className='text-red-500 text-sm'>{imageUploadErr}</p>}
              {(foamData.imageUrls.length > 0 && foamData.imageUrls.length <= 6)&& (
                <div className='flex flex-wrap gap-4 mt-4'>
                  {foamData.imageUrls.map((url, index) => (
                    <div className='flex justify-between items-center border border-gray-300 p-3 w-full' key={index}>
                      <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                      <button type='button' className='text-red-700 uppercase p-3 hover:opacity-95' onClick={() => handleRemoveImage(index)}>Delete</button>
                    </div>
                  ))}
                </div>
              )}
            <button disabled={dataUploading || isUploading} className="p-3 uppercase text-white bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80">{dataUploading ? "Updating..." : "Update Listing"}</button>
              {successMessage && <p className='text-green-500 text-center'>Listing updated successfully</p>}
          </div>
        </form>
      </main>
    </>
  )
}
