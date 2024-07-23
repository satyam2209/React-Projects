import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const NewCompress = () => {
  const [originalLink, setOriginalLink] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [compressedLink, setCompressedLink] = useState("");

  const handleImg = (e) => {
    const imageFile = e.target.files[0]; // this select the image file
    setOriginalLink(URL.createObjectURL(imageFile)); // this create url of image and show image
    setOriginalImage(imageFile);
    setUploadImage(true);
    console.log(imageFile);
  };

  const handleCompress = async (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Image is too small, can't be compressed!");
    }

    const compressedImage = await imageCompression(originalImage, options);
    const downloadLink = URL.createObjectURL(compressedImage);
    setCompressedLink(downloadLink);
    return 1;
  };

  return (
    <div className="pt-3 h-screen w-screen">
      <h1 className="text-4xl font-bold text-center">Compress IMAGE</h1>
      <div className="text-black text-2xl flex justify-center mt-4 ml-[5.25rem]">
        <div className="text-start">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Images</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>
      </div>
      <div className="text-black text-xl text-center mt-4 px-3">
        Compress <span className="text-blue-400 underline">JPG</span>,{" "}
        <span className="text-blue-400 underline">PNG</span>,{" "}
        <span className="text-blue-400 underline">SVG</span> or{" "}
        <span className="text-blue-400 underline">GIF</span> with the best
        quality and compression. Reduce the filesize of your images at once.
      </div>
      {/* --------------------- */}
      <div className="">
        <div className="relative flex justify-center mt-8">
          <input
            type="file"
            accept="image/*"
            id="file-input"
            className="absolute w-0 h-0 opacity-0 inset-0"
            onChange={handleImg}
          />
          <label
            htmlFor="file-input"
            className="bg-blue-400 w-[150px] h-[45px] rounded-sm flex justify-center items-center text-white cursor-pointer"
          >
            Select Image
          </label>
        </div>
        <div className="flex w-[100%]">
          <div className="w-[40%] flex justify-center">
            {uploadImage && (
              <div className="">
                <div>
                  <img
                    src={originalLink}
                    alt="Original Img"
                    className="w-[183px] h-[244px]"
                  />
                  <p className="text-black text-base">{originalImage.name}</p>
                </div>
              </div>
            )}
          </div>
          <div className="w-[20%] flex justify-center items-center">
            <div>
            {originalImage.name && (
              <button
                className="bg-blue-400 w-[150px] h-[45px] rounded-sm text-white"
                onClick={handleCompress}
              >
                Compress
              </button>
            )}

            {compressedLink && (
              <a
                href={compressedLink}
                download={originalImage.name}
                className="bg-blue-400 w-[150px] h-[45px] rounded-sm flex justify-center items-center text-white cursor-pointer mt-14"
              >
                Download Image
              </a>
            )}
            </div>
          </div>
          <div className="w-[40%] flex justify-center">
            {compressedLink && (
              <div className="">
                <div>
                  <img
                    src={originalLink}
                    alt="compressed Img"
                    className="w-[183px] h-[244px]"
                  />
                  <p className="text-black text-base">{originalImage.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCompress;
