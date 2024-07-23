import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";

const ImageCompressor = () => {
  const [compressedLink, setCompressedLink] = useState(
    "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
  );
  const [originalImage, setOriginalImage] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [outputFileName, setOutputFileName] = useState("");
  const [clicked, setClicked] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOriginalLink(URL.createObjectURL(imageFile));
    setOriginalImage(imageFile);
    setOutputFileName(imageFile.name);
    setUploadImage(true);
  };

  const click = async (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    const output = await imageCompression(originalImage, options);
    const downloadLink = URL.createObjectURL(output);
    setCompressedLink(downloadLink);

    setClicked(true);
    return 1;
  };

  return (
    <div className="m-5">
      <div className="text-black text-center">
        <h1>Three Simple Steps</h1>
        <h3>1. Upload Image</h3>
        <h3>2. Click on Compress</h3>
        <h3>3. Download Compressed Image</h3>
      </div>

      <div className="row mt-5">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {uploadImage ? (
            <Card.Img className="ht" variant="top" src={originalLink} />
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
            />
          )}
          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={handle}
            />
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
          <br />
          {outputFileName && (
            <button type="button" className="btn btn-dark" onClick={click}>
              Compress
            </button>
          )}
        </div>

        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
          <Card.Img variant="top" src={compressedLink} />
          {clicked && (
            <div className="d-flex justify-content-center">
              <a
                href={compressedLink}
                download={outputFileName}
                className="mt-2 btn btn-dark w-75"
              >
                Download
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
