import { Card, Rate, Button } from "antd";
import {
  ClockCircleOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import styles from "./MentorCard.module.css";
import { useNavigate } from "react-router-dom";

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  return (
    <Card hoverable className={styles.card}>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img src={mentor.M_Expertise.Image} alt="expertise" />
        <div className={styles.badge}>
          {mentor.M_Expertise.Name}
        </div>
      </div>

      {/* NAME */}
      <h3 className={styles.name}>{mentor.M_Name}</h3>

      {/* DESCRIPTION */}
      <p className={styles.bio}>{mentor.M_Bio}</p>

      {/* META */}
      <div className={styles.pills}>
        <span className={styles.pill}>
          <ClockCircleOutlined /> {mentor.M_ExperienceYears}+ yrs
        </span>

        <span className={styles.pill}>
          <GlobalOutlined /> {mentor.M_Language}
        </span>
      </div>

      {/* RATING */}
      <div className={styles.rating}>
        <Rate disabled defaultValue={mentor.M_Rating} />
      </div>

      {/* BUTTON (THEME FIXED) */}
      <Button className={styles.btn} onClick={() => navigate(`/mentor/${mentor.M_Id}`)} block>
        View Profile
      </Button>

    </Card>
  );
};

export default MentorCard;