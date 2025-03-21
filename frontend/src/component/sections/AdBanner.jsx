import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const bannerData = [
  {
    id: 1,
    title: "Intel AI PC",
    subtitle: "From ₹62,990*",
    description: "Find anything in a few clicks. Not 40.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-blue-900 to-blue-700"
  },
  {
    id: 2,
    title: "Summer Fashion Sale",
    subtitle: "Up to 70% Off",
    description: "Latest trends at unbeatable prices",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-purple-900 to-purple-700"
  },
  {
    id: 3,
    title: "Electronics Fest",
    subtitle: "Starting from ₹999",
    description: "Best deals on electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bgColor: "from-gray-900 to-gray-700"
  }
];

const AdBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + bannerData.length) % bannerData.length);
  };

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[350px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className={`absolute w-full h-full bg-gradient-to-r ${bannerData[currentIndex].bgColor} flex flex-col md:flex-row items-center justify-center md:justify-between px-6 sm:px-10 lg:px-16`}
        >
          <div className="text-white text-center md:text-left max-w-md">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{bannerData[currentIndex].title}</h2>
            <h3 className="text-lg sm:text-xl md:text-3xl font-semibold mb-2 md:mb-4">{bannerData[currentIndex].subtitle}</h3>
            <p className="text-sm sm:text-base md:text-lg opacity-90">{bannerData[currentIndex].description}</p>
          </div>
          <img
            src={bannerData[currentIndex].image}
            alt={bannerData[currentIndex].title}
            className="w-40 sm:w-60 md:w-80 lg:w-[500px] h-auto object-cover rounded-lg shadow-lg mt-4 md:mt-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 sm:p-3 rounded-full" onClick={() => paginate(-1)}>
        <ChevronLeft className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 sm:p-3 rounded-full" onClick={() => paginate(1)}>
        <ChevronRight className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerData.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${index === currentIndex ? 'bg-white w-4 sm:w-5' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default AdBanner;
