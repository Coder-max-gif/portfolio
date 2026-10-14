import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import SectionIndex from "@/components/SectionIndex";
import Reveals from "@/components/Reveals";
import Hero from "@/components/Hero";
import Origin from "@/components/Origin";
import About from "@/components/About";
import Services from "@/components/Services";
import Principles from "@/components/Principles";
import Split from "@/components/Split";
import Beliefs from "@/components/Beliefs";
import Beyond from "@/components/Beyond";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Atmosphere />
      <Nav />
      <SectionIndex />
      <main>
        <Hero />
        <Origin />
        <About />
        <Services />
        <Principles />
        <Split />
        <Beliefs />
        <Beyond />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <Reveals />
    </>
  );
}
