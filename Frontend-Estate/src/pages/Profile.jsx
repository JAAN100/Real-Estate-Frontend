import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CloudinaryUpload from "../components/CloudinaryUpload";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const uploadRef = useRef(null);

  const [photo, setPhoto] = useState(currentUser?.avatar || null);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      username,
      email,
      password,
      avatar: photo,
    };
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
            src={photo || "https://via.placeholder.com/150"}
            alt="profile"
            className="rounded-full border-2 border-gray-300 cursor-pointer"
            width={150}
            height={150}
            onClick={() => uploadRef.current.openUpload()}
          />

          <CloudinaryUpload
            ref={uploadRef}
            onUpload={(url) => setPhoto(url)}
          />
          <p className="text-sm text-gray-500">
            Click on the image to upload a new profile picture
          </p>
          <p className="text-sm text-red-500">
            {photo !== undefined ? "" : "Error: Photo not updated"}
          </p>
          <p className="text-sm text-green-500">
           {photo !== undefined && photo !== currentUser?.avatar ? "Photo updated successfully" : ""}
          </p>
        </div>


        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />


        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />


        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />


        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:opacity-80 transition"
        >
          Update
        </button>


        <div className="flex justify-between">
          <span className="text-red-700 cursor-pointer hover:opacity-60">
            Delete Account
          </span>

          <span className="text-red-700 cursor-pointer hover:opacity-60">
            Sign out
          </span>
        </div>

      </form>
    </div>
  );
}