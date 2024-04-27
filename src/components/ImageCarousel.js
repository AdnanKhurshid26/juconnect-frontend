import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState, useEffect } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoMdAddCircleOutline, IoMdSchool } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { backendUrl, appendToUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ImageCarousel = (props) => {

  const images = props.images.map((image) => {
    return image.image_url;
  });
  const [addNew, setAddNew] = useState(false);
  const nonEditable = props.nonEditable;
  const id = props.id;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(1);
  const [file, setFile] = useState(undefined);

  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const token = getLocalStorage();

  const uploadFile = async () => {
    console.log(file);

    if (!file) {
      window.alert("Please select a file");
      return;
    }

    //check for png or jpg or jpeg extension

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      window.alert("Please select a valid image file");
      return;
    }
    //i want to upload file to api server as formdata
    //add id to body and file to req.file

    const formData = new FormData();

    formData.append("id", id);
    formData.append("file", file);

    const url = appendToUrl(backendUrl, "project/insert_image");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    });

    if (response.status === 200) {
      const data = await response.json();
      props.imageUploadHandler(data.objectKey)
      window.alert("Image uploaded successfully");
      // window.location.reload();
    } else {
      window.alert("Image upload failed");
    }
  };

  const updateVisibleImages = () => {
    const containerWidth =
      document.getElementById("carousel-container").offsetWidth;
    setVisibleImages(Math.min(4, Math.floor(containerWidth / 150))); // Assuming each image is 150px wide
  };

  useEffect(() => {
    updateVisibleImages();
    window.addEventListener("resize", updateVisibleImages);
    return () => {
      window.removeEventListener("resize", updateVisibleImages);
    };
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + images.length) % images.length
    );
  };

  const isPrevButtonDisabled = currentIndex === 0;
  const isNextButtonDisabled =
    currentIndex === images.length - visibleImages;

  return (
    <Accordion>
      <AccordionSummary
        className="font-semibold text-xl flex flex-row justify-between"
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="text-orange-primary flex flex-row gap-2 items-center h-1 w-full">
          <IoMdSchool />
          Images
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div
          id="carousel-container"
          className="w-full flex flex-col gap-2"
          style={{ overflow: "hidden", position: "relative" }}
        >
          {addNew && !nonEditable && (
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                {/* <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                /> */}
                <div className="flex flex-col gap-1 w-5/12">
                  <label className="text-lg">Upload</label>
                  <input
                    type="file"
                    className=" w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <button
                className="text-white mt-2 bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
                onClick={uploadFile}
              >
                Save
              </button>
            </div>
          )}
          {!addNew && !nonEditable && (
            <button
              onClick={() => {
                setAddNew(true);
              }}
              className="text-white bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
            >
              <IoMdAddCircleOutline className="font-bold" />
              Add
            </button>
          )}
          <div
            style={{
              display: "flex",
              transition: "transform 0.5s ease",
              transform: `translateX(-${
                currentIndex * (100 / visibleImages)
              }%)`,
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ width: `${100 / Math.min(4, visibleImages)}%` }}
                margin="10"
              />
            ))}
          </div>
          {images.length > visibleImages && (
            <>
              <button
                onClick={goToPrevSlide}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  visibility: isPrevButtonDisabled ? "hidden" : "visible",
                }}
                disabled={isPrevButtonDisabled}
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={goToNextSlide}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  visibility: isNextButtonDisabled ? "hidden" : "visible",
                }}
                disabled={isNextButtonDisabled}
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ImageCarousel;

// export default ImageCarousel;
