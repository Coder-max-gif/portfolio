"use client";

import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Origin from "@/components/Origin";
import About from "@/components/About";
import Services from "@/components/Services";
import Principles from "@/components/Principles";
import Audience from "@/components/Audience";
import Beliefs from "@/components/Beliefs";
import Beyond from "@/components/Beyond";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // reducedMotion="user": honours the phone/OS "Reduce Motion" setting everywhere
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Origin />
        <About />
        <Services />
        <Principles />
        <Audience />
        <Beliefs />
        <Beyond />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
