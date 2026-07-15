import { useNavigate, useLocation } from "react-router-dom";
import {useEffect} from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import MentorSection from "../../components/MentorListSection/MentorListSection";
import FooterSection from "../../components/Footer/Footer";


function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const params = new URLSearchParams(
      location.search
    );

    const section = params.get("section");

    if (section) {

      setTimeout(() => {
        document
          .getElementById(section)
          ?.scrollIntoView({
            behavior: "smooth"
          });
      }, 100);

    }

  }, [location]);

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <Navbar />
      {/* HERO */}
      <HeroSection />
      <MentorSection />
      <FooterSection />
    </div>
  );
}

export default Home;