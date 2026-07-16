import {useState , useEffect} from 'react'
import {uploadFile} from '../components/CloudinaryUpload';
import {LoaderCircle} from 'lucide-react';
export default function CreateListing() {
  const [files , setFiles] = useState([]);
  const [foamData , setFormData] = useState({
    imagesURL: [],
  });
  const [imageUploadErr , setImageUploadErr] = useState("");
  const [isUploading , setIsUploading] = useState(false);
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
      if(foamData.imagesURL.length + urls.length <= 6) {
        setFormData((prevData) => ({
          ...prevData,
          imagesURL: prevData.imagesURL.concat(urls),
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
      imagesURL: foamData.imagesURL.filter((_, i) => i !== index)
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setImageUploadErr("");
    }, 5000);
  }, [imageUploadErr]);
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
              <input className='w-5' type="radio" id="sell" name='type'/>
              <label htmlFor="sell">Sell</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="radio" id="rent" name='type'/>
              <label htmlFor="rent">Rent</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="radio" id="parking" />
              <label htmlFor="parking">Parking Spot</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="radio" id="furnished" />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className='flex gap-2'>
              <input className='w-5' type="radio" id="offer" />
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
            <input onChange={(e)=>{setFiles([...e.target.files])}} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple/>
            <button type='button' onClick={handleFileUpload} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            {isUploading && <LoaderCircle className='animate-spin text-green-700' />}
          </div>
            {imageUploadErr && <p className='text-red-500 text-sm'>{imageUploadErr}</p>}
            {(foamData.imagesURL.length > 0 && foamData.imagesURL.length <= 6)&& (
              <div className='flex flex-wrap gap-4 mt-4'>
                {foamData.imagesURL.map((url, index) => (
                  <div className='flex justify-between items-center border border-gray-300 p-3 w-full' key={index}>
                    <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                    <button type='button' className='text-red-700 uppercase p-3 hover:opacity-95' onClick={() => handleRemoveImage(index)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          <button className="p-3 uppercase text-white bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80">Create Listing</button>
        
        </div>
       </form>
    </main>
  )
}
