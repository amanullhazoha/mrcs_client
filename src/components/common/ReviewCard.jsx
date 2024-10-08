import { motion } from "framer-motion";
import { user } from "../../assets/image";
import { Rating } from "@smastrom/react-rating";

const ReviewCard = ({
  image,
  rating,
  review,
  user_name,
}) => {
  return (
      <div
        className="relative"
        title="Attempt this question please buy Subscription account"
      >
        <motion.div
          className={`cursor-pointer  relative overflow-hidden transition duration-500 ease-in-out rounded-lg bg-white 
          shadow-md  backdrop-filter backdrop-blur-sm border border-red-500 hover:shadow-md hover:shadow-emerald-700 p-4`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex gap-2.5 mb-2.5">
            <img
                alt="Profile"
                src={image ? image : user}
                className=" rounded-full w-12 h-13 border border-emerald-500 "
            />
            
            <div>
                <h3 className="text-lg font-medium">{user_name}</h3>
                <Rating
                  readOnly
                  value={rating}
                  style={{ maxWidth: 80 }}
                />
            </div>
          </div>


          <p>{review}</p>
        </motion.div>
      </div>
  );
};

export default ReviewCard;
