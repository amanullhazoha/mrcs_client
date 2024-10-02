import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import default styles
import ReviewCard from "./ReviewCard"; // Assuming ReviewCard is a separate component

const reviews = [
  // Your review data here
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4, // 4 items on large screens
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3, // 3 items on desktop screens
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2, // 2 items on tablets
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // 1 item on mobile screens
  },
};

const ReviewCarousel = ({ reviews }) => {
  return (
    <div className="pt-3 px-2 bg-[#FAF6E8] rounded-b-lg">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true} // Set to true if you want auto-play functionality
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="px-2 py-4" // Add spacing between items using Tailwind's padding
      >
        {reviews?.map((item, index) => (
          <ReviewCard
            key={index}
            review={item?.review}
            rating={item?.rating}
            user_name={item?.user_name}
            image={item?.user_profile_image}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
