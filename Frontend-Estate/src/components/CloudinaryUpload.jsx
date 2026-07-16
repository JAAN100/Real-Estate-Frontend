import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";

const CloudinaryUpload = forwardRef(({ onUpload }, ref) => {
  const widgetRef = useRef(null);
  const onUploadRef = useRef(onUpload);

  useEffect(() => {
    onUploadRef.current = onUpload;
  }, [onUpload]);

  useEffect(() => {
    if (!window.cloudinary) {
      console.error("Cloudinary script not loaded yet");
      return;
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "ueamvju9",
        uploadPreset: "mern-project",
        multiple: false,
        cropping: true,
        folder: "profile-images",
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        if (result?.event === "success") {
          onUploadRef.current(result.info.secure_url);
        }
      }
    );
  }, []);

  useImperativeHandle(ref, () => ({
    openUpload() {
      if (!widgetRef.current) {
        console.log("Widget not ready");
        return;
      }

      widgetRef.current.open();
    },
  }));

  return null;
});

const uploadFile = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "mern-project");
  data.append("folder", "profile-images");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ueamvju9/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const uploaded = await res.json();

  return uploaded.secure_url;
};


export default CloudinaryUpload;
export { uploadFile };