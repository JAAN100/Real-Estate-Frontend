import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CloudinaryUpload from "../components/CloudinaryUpload";
import{updateUserStart, updateUserSuccess, updateUserFailed ,setShowPassword} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff , LoaderCircle} from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const {currentUser ,loading ,  error , showPassword} = useSelector((state) => state.user);
  const uploadRef = useRef(null);
  const [formData, setFormData] = useState({});

  const handleFoamDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success == false) {
        dispatch(updateUserFailed(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailed(error.message));
    }
    
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>

      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >

        <div className="flex flex-col items-center gap-3">
          <img
            src={formData.avatar || currentUser?.avatar}
            alt="profile"
            className="rounded-full border-2 border-gray-300 cursor-pointer"
            width={150}
            height={150}
            onClick={() => uploadRef.current.openUpload()}
          />

          <CloudinaryUpload
            ref={uploadRef}
            onUpload={(url) =>
              handleFoamDataChange({
                target: {
                  id: "avatar",
                  value: url,
                },
              })
            }
          />
          <p className="text-sm text-gray-500">
            Click on the image to upload a new profile picture
          </p>
          <p className="text-sm text-green-500">
           {formData.avatar !== undefined && formData.avatar !== currentUser?.avatar ? "Photo updated successfully" : ""}
          </p>
        </div>


        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser?.username}
          onChange={handleFoamDataChange}
          className="border-2 border-gray-300 rounded-md p-2"
        />


        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser?.email}
          onChange={handleFoamDataChange}
          className="border-2 border-gray-300 rounded-md p-2"
        />


        <div className="relative">
          <input 
            className="border p-3 w-full
            rounded-lg" type={showPassword ? "text" : "password"} 
            placeholder="password"
            id="password" onChange={handleFoamDataChange}
          />
          <button
            type="button"
            onClick={() => dispatch(setShowPassword(!showPassword))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>


        <button
          disabled={loading}
          type="submit"
          className="flex justify-center items-center bg-blue-500 text-white p-2 rounded-md hover:opacity-90 disabled:opacity-50 transition"
        >
         {loading ? <LoaderCircle className="animate-spin h-6 w-6 text-white" /> : "Update"}
        </button>


        <div className="flex justify-between">
          <span className="text-red-700 cursor-pointer hover:opacity-60">
            Delete Account
          </span>

          <span className="text-red-700 cursor-pointer hover:opacity-60">
            Sign out
          </span>
        </div>

        {error ? <p className="bg-orange-600
                  text-white mt-5 rounded-lg uppercase p-3">{error}</p> : ""}

      </form>
    </div>
  );
}