import MentorCard from "../MentorCard/MentorCard";
import { useEffect, useState } from "react";
import { getAllMentors } from "../../api/mentorApi";
import styles from "./MentorListSection.module.css";

const MentorSection = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        try {
            const res = await getAllMentors();
            setMentors(res.data);
        } catch (err) {
            console.log("Error fetching mentors:", err);
        } finally {
            setLoading(false);
        }
    };

  return (
    <section id="mentors" className={styles.section}>
      <h1 className={styles.heading}>
        Learn from Industry Experts
      </h1>

      {/* <p className={styles.subheading}>
       Discover experienced mentors across multiple domains including development, design, and career guidance. Each mentor brings hands-on industry experience and a structured approach to teaching. Learn through 1:1 sessions, clear problem-solving, and real-world insights that help you grow faster and with confidence.
      </p> */}

      {loading ? (
            <p>Loading mentors...</p>
        ) : (
                <div className={styles.grid}>
                    {mentors.map((m) => (
                        <MentorCard key={m.M_Id} mentor={m} />
                    ))}
                </div>
        )
        }
    </section>
  );
};

export default MentorSection;