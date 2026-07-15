import { Card } from "antd";
import styles from "./aboutMentorSection.module.css";

const AboutMentorSection = ({ mentor }) => {
  if (!mentor) return null;

  return (
    <Card className={styles.aboutCard}>
      <h2>About Mentor</h2>

      <p>
        {mentor.M_Name} is an experienced{" "}
        {mentor.M_Expertise.E_Name} professional with over{" "}
        {mentor.M_ExperienceYears} years of practical industry experience.

        Throughout their career, they have worked on real-world projects,
        collaborated with diverse teams, and guided aspiring learners in
        building strong technical and professional foundations.

        Through structured one-on-one mentorship sessions, students receive
        personalized guidance, industry insights, practical learning strategies,
        and career-oriented advice tailored to their goals.

        Whether you're preparing for placements, strengthening technical skills,
        exploring career opportunities, or seeking direction in your learning
        journey, this mentorship experience is designed to help you grow with
        confidence and clarity.
      </p>
    </Card>
  );
};

export default AboutMentorSection;