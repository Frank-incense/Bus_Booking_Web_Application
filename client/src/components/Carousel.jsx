import React from "react";

const Carousel = () => {
  const carouselImages = [
    {
      src: "https://res.cloudinary.com/delbvi5dc/image/upload/v1752994567/cld-sample-2.jpg",
      alt: "Bus Travel Scenic View",
    },
    {
      src: "https://res.cloudinary.com/delbvi5dc/image/upload/v1752994567/cld-sample.jpg",
      alt: "On the Road",
    },
    {
      src: "https://res.cloudinary.com/delbvi5dc/image/upload/v1752994567/samples/cup-on-a-table.jpg",
      alt: "City Bus Scene",
    },
  ];

  return (
    <div id="tripCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" >
      <div className="carousel-inner">
        {carouselImages.map((img, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
          >
            <img
              src={img.src}
              className="d-block w-100"
              alt={img.alt}
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#tripCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#tripCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
