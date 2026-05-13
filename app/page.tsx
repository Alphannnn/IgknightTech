import HeroSection from "./components/Hero";
import Navbar from "./components/Navbar";
import {
  ProjectManagementSection,
  WorkTogetherSection,
} from "./components/Features";
// import Team from "./components/Team";
import Services from "./components/Services";
import Process from "./components/Process";
import TrustedBy from "./components/TrustedBy";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";


export default function Home() {
  return (
     <>
       <Navbar />
       <HeroSection />
       <ProjectManagementSection />
       <WorkTogetherSection />
       <Services />
       <Process />
       <TrustedBy />
       <Testimonials />
       <Footer />
     </>
  );
}
