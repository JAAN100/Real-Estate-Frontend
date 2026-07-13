import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";

const CloudinaryUpload = forwardRef(({ onUpload }, ref) => {
  const widgetRef = useRef(null);

  useEffect(() => {
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
          return error;
        }

        if (result?.event === "success") {
         onUpload(result.info.secure_url);
        }
      }
    );
  }, [onUpload]);

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

export default CloudinaryUpload;