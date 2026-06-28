import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-background">
      {/* Subtle animated background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(26,107,224,0.07) 0%, transparent 70%)",
            top: "5%",
            left: "-8%",
            filter: "blur(70px)",
          }}
          animate={{ x: [0, 60, -30, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,197,200,0.05) 0%, transparent 70%)",
            bottom: "10%",
            right: "-10%",
            filter: "blur(90px)",
          }}
          animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(13,31,110,0.05) 0%, transparent 70%)",
            top: "45%",
            left: "38%",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 40, -40, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
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
