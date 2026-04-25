import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const newsData = [
  {
    id: 1,
    title: "Cara Melaporkan Barang Hilang dengan Efektif",
    description:
      "Pastikan Anda memberikan deskripsi yang mendetail dan foto yang jelas saat melaporkan barang hilang untuk mempercepat proses pencocokan.",
    image:
      "https://images.unsplash.com/photo-1769794371055-54436b54577e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwd3JpdGluZyUyMG5vdGVzJTIwZGVza3xlbnwxfHx8fDE3NzMxOTQ0MTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Langkah-Langkah Melaporkan Barang Temuan",
    description:
      "Serahkan barang ke petugas security terdekat dan ambil foto sebagai bukti sebelum diserahkan untuk memudahkan proses verifikasi.",
    image:
      "https://images.unsplash.com/photo-1636904462782-bf3b14c34e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB0YWtpbmclMjBwaG90byUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzczMTk0NDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Penting! Lindungi Privasi Anda",
    description:
      "Jangan cantumkan informasi sensitif dan gunakan email kampus (@umm.ac.id) untuk verifikasi identitas demi keamanan bersama.",
    image:
      "https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwcHJpdmFjeSUyMHNlY3VyaXR5JTIwc2hpZWxkfGVufDF8fHx8MTc3MzE4MzA3NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Statistik Lost & Found Kampus",
    description:
      "Lebih dari 200+ barang berhasil dikembalikan tahun ini dengan tingkat keberhasilan pengembalian mencapai 75% di lingkungan kampus.",
    image:
      "https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzczMTI3NTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % newsData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + newsData.length) % newsData.length,
    );
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentNews = newsData[currentIndex];

  return (
    <div className="space-y-4">
      {/* Carousel */}
      <div
        className="relative h-[280px] md:h-[350px] rounded-lg overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={currentNews.image}
                alt={currentNews.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-8 md:px-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl"
              >
                {/* Title */}
                <h2 className="text-xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                  {currentNews.title}
                </h2>

                {/* Description */}
                <p className="text-base md:text-md text-white/90 leading-relaxed max-w-2xl mx-auto">
                  {currentNews.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Auto-play Progress Bar */}
        {!isPaused && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-orange-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 20, ease: "linear" }}
            key={currentIndex}
          />
        )}
      </div>

      {/* Login CTA Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Login Card (Warna Hitam) */}
        <div className="bg-black rounded-md p-8 md:p-10 text-white flex flex-col">
          <h2 className="text-xl md:text-3xl font-semibold mb-3">
            <span className="text-white">login </span>
            <span className="text-orange-500">Sekarang</span>
          </h2>
          <p className="text-white/90 text-sm md:text-md mb-6 leading-relaxed">
            Silahkan login terlebih dahulu untuk dapat
            melaporkan barang hilang atau menemukan barang yang
            hilang di lingkungan kampus. Gunakan akun email
            kampus Anda (@umm.ac.id).
          </p>

          <a
            href="/login"
            className="mt-auto w-fit text-xs inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Login Sekarang
          </a>
        </div>

        {/* Sign Up Card (Pengganti Image Card - Warna Oranye) */}
        <div className="bg-orange-500 rounded-md p-8 md:p-10 text-white flex flex-col">
          <h2 className="text-xl md:text-3xl font-semibold mb-3">
            Belum Punya{" "}
            <span className="text-black">Akun?</span>
          </h2>
          <p className="text-white/90 text-sm md:text-md mb-6 leading-relaxed">
            Jangan khawatir! Daftarkan diri Anda segera untuk
            mulai menggunakan fitur lengkap kami dalam membantu
            sesama warga kampus menemukan barang mereka.
          </p>

          <a
            href="/signup"
            className="mt-auto w-fit text-xs inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
          >
            Daftar Akun Baru
          </a>
        </div>
      </div>
    </div>
  );
}