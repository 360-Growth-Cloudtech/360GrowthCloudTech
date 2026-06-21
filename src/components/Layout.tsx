import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div 
      className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-background"
      style={{
        backgroundImage: "radial-gradient(rgba(26, 107, 224, 0.05) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Dynamic Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(26, 107, 224, 0.15) 0%, rgba(0, 197, 200, 0) 70%)",
            top: "10%",
            left: "-10%",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(13, 31, 110, 0.12) 0%, rgba(79, 110, 247, 0) 70%)",
            bottom: "15%",
            right: "-10%",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 80, -60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 197, 200, 0.1) 0%, rgba(26, 107, 224, 0) 70%)",
            top: "50%",
            left: "40%",
            filter: "blur(50px)",
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <Navbar />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
