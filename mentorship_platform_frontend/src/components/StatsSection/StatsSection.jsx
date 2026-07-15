import { useEffect, useState } from "react";
import styles from "./StatsSection.module.css";
import studentsImg from "../../assets/images/students.png";
import mentorsImg from "../../assets/images/mentors.png";
import sessionsImg from "../../assets/images/sessions.png";
import outcomesImg from "../../assets/images/careeroutcomes.png";
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  RocketOutlined
} from "@ant-design/icons";

const statsData = [
  {
    image: studentsImg,
    icon: <UserOutlined />,
    count: 10000,
    suffix: "+",
    label: "Students",
    desc: "Thousands of students actively use the platform to connect with experienced mentors, clarify doubts, and build real-world skills through structured 1:1 guidance sessions.",
  },
  {
    image: mentorsImg,
    icon: <TeamOutlined />,
    count: 500,
    suffix: "+",
    label: "Mentors",
    desc: "A growing network of industry professionals, engineers, and domain experts who guide learners through personalized mentorship, career advice, and practical insights.",
  },
  {
    image: sessionsImg,
    icon: <CalendarOutlined />,
    count: 25000,
    suffix: "+",
    label: "Sessions",
    desc: "Successfully completed mentorship sessions that help students gain clarity, improve problem-solving, and accelerate their learning journey with hands-on discussions.",
  },
  {
    image: outcomesImg,
    icon: <RocketOutlined />,
    count: 3000,
    suffix: "+",
    label: "Career Outcomes",
    desc: "Students who have improved their career direction, cracked interviews, or secured better opportunities after mentorship guidance."
  }
];

const Counter = ({ target }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setValue(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return value;
};

const StatsSection = () => {
  return (
    <section id="stats" className={styles.statsSection}>
      <h2 className={styles.heading}>Crafting Futures Through Mentorship</h2>
        <p className={styles.subHeading}>
            Real mentorship outcomes powered by structured 1:1 learning, expert guidance, and consistent progress tracking across thousands of students. Built to help learners improve skills, gain clarity, and achieve meaningful career growth through personalized mentorship experiences and practical learning.
        </p>
      <div className={styles.grid}>
        {statsData.map((item, idx) => (
          <div key={idx} className={styles.card}>
            
            <div className={styles.imageBox}>
                <img src={item.image} alt={item.label} />
            </div>

            {/* floating icon */}
            <div className={styles.iconCircle}>
              {item.icon}
            </div>


            <div className={styles.count}>
            <Counter target={item.count} />
            {item.suffix}
            </div>

            <div className={styles.labelHighlight}>
            {item.label}
            </div>
        
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;