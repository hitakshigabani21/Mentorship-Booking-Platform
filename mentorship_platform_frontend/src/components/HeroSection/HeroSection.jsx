import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";
import heroImg from "../../assets/images/hero2.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero} id="home">
      
      {/* LEFT SIDE TEXT */}
      <div className={styles.heroText}>
        <h1>Book 1:1 Mentors. Learn Faster. Build Real Skills.</h1>

        <p>
          Connect with experienced industry mentors, book personalized 1:1 sessions, and get structured guidance tailored to your learning goals. Gain practical insights, clear direction, and real-world knowledge to accelerate your skills and career growth.
        </p>

        <div className={styles.heroBtns}>
          <button
            onClick={() => navigate("/signup")}
            className={styles.primary}
          >
            Start Learning
          </button>

          <button className={styles.secondary}
            onClick={() =>
              document
                .getElementById("mentors")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Mentors
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className={styles.heroImage}>
        <img src={heroImg} alt="hero" />
      </div>

    </section>
  );
};

export default HeroSection;