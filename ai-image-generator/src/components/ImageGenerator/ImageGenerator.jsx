import React, { useRef, useState } from "react";
import "./CommonStyle.css";
import defaultImg from "../assets/default-generator.jpg";

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const ImageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "256x256",
        }),
      }
    );

    let data = await response.json();
    // Check if dataArray exists and has at least one element
    if (data && data.data && data.data.length > 0) {
      let dataArray = data.data;
      setImageUrl(dataArray[0].url);
    } else {
      // Handle the case where dataArray is empty or undefined
      console.error("No image URL found in response data");
    }
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl === "/" ? defaultImg : imageUrl} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading....
          </div>
        </div>
      </div>
      {/* ------- */}
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you see"
        />
        <div
          className="generate-btn"
          onClick={() => {
            ImageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
