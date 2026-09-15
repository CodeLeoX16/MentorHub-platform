import React from "react";
import Footer from "./Footer";
import { Nav } from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-purple-500 selection:text-white">
      {/* Subtle Background Glow behind Header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-96 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Sticky Header Layer */}
      <header className="sticky top-0 z-50">
        <Nav />
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Footer at the Bottom */}
      <footer className="relative z-10 mt-auto border-t border-slate-200/80 bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;