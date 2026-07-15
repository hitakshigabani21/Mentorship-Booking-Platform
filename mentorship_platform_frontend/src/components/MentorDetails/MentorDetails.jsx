import {
  Card,
  Rate,
  Tag,
  Button
} from "antd";

import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

import styles from "./MentorDetails.module.css";

const MentorDetails = ({ mentor }) => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;
  return (
    <Card className={styles.heroCard}>
      <div className={styles.heroContent}>

        {/* IMAGE */}
        <div className={styles.imageSection}>
          <img
            src={mentor.M_Expertise.Image}
            alt={mentor.M_Expertise.Name}
          />
        </div>

        {/* DETAILS */}
        <div className={styles.detailsSection}>

          <Tag className={styles.expertiseTag}>
            {mentor.M_Expertise.Name}
          </Tag>

          <h1>{mentor.M_Name}</h1>

          <p className={styles.bio}>
            {mentor.M_Bio}
          </p>

          <div className={styles.rating}>
            <Rate
              allowHalf
              disabled
              defaultValue={mentor.M_Rating}
            />
          </div>

          <div className={styles.actionButtons}>

            <Button
              className={styles.bookNowBtn}
              onClick={() =>
                document
                  .getElementById("slots-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book a Session
            </Button>

            {
              role === "mentor" && (
                <Button className={styles.editBtn}>
                  Edit Profile
                </Button>
              )
            }

          </div>

          <div className={styles.infoRow}>

            <span>
              <ClockCircleOutlined />
              {mentor.M_ExperienceYears}+ Years Experience
            </span>

            <span>
              <GlobalOutlined />
              {mentor.M_Language}
            </span>

            <span>
              <MailOutlined />
              {mentor.M_Email}
            </span>

            <span>
              <PhoneOutlined />
              {mentor.M_Phone}
            </span>

          </div>

        </div>
      </div>
    </Card>
  );
};

export default MentorDetails;