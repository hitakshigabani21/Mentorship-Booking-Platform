import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Button,
  Typography,
  Row,
  Col
} from "antd";

import {
  ArrowLeftOutlined,
  UserOutlined,
  SolutionOutlined,
  CheckCircleFilled,
  CheckOutlined,
  TeamOutlined,
  CalendarOutlined,
  RocketOutlined
} from "@ant-design/icons";

import styles from "./RoleSelection.module.css";

const { Title, Text, Link } = Typography;

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleContinue = () => {
    navigate("/signup/details", {
      state: {
        role: selectedRole
      }
    });
  };

  return (
    <div className={styles.page}>
      
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className={styles.backBtn}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>

      <div className={styles.hero}>
        <Text className={styles.step}>
          STEP 1 OF 2
        </Text>

        <Title className={styles.heading}>
          Create Your Account
        </Title>

        <Text className={styles.subHeading}>
          Choose how you want to use Mentorly
        </Text>
      </div>

      <div className={styles.roleSection}>

        <Row gutter={[24, 24]} justify="center">

          {/* STUDENT */}

          <Col xs={24} lg={12}>
            <Card
              hoverable
              className={`${styles.roleCard} ${
                selectedRole === "student"
                  ? styles.selected
                  : ""
              }`}
              onClick={() => setSelectedRole("student")}
            >
              <div className={styles.selectionIcon}>
                {selectedRole === "student" ? (
                  <CheckCircleFilled />
                ) : (
                  <div className={styles.emptyCircle}></div>
                )}
              </div>

              <UserOutlined className={styles.roleIcon} />

              <Title level={3}>
                Student
              </Title>

              <Text className={styles.description}>
                Learn from experienced mentors,
                book sessions, and accelerate
                your learning journey.
              </Text>

              <ul className={styles.features}>
                <li>Book mentorship sessions</li>
                <li>Explore expert mentors</li>
                <li>Track your growth</li>
              </ul>
            </Card>
          </Col>

          {/* MENTOR */}

          <Col xs={24} lg={12}>
            <Card
              hoverable
              className={`${styles.roleCard} ${
                selectedRole === "mentor"
                  ? styles.selected
                  : ""
              }`}
              onClick={() => setSelectedRole("mentor")}
            >
              <div className={styles.selectionIcon}>
                {selectedRole === "mentor" ? (
                  <CheckCircleFilled />
                ) : (
                  <div className={styles.emptyCircle}></div>
                )}
              </div>

              <SolutionOutlined className={styles.roleIcon} />

              <Title level={3}>
                Mentor
              </Title>

              <Text className={styles.description}>
                Share your expertise,
                guide learners, and
                manage mentoring sessions.
              </Text>

              <ul className={styles.features}>
                <li>Create availability slots</li>
                <li>Manage sessions</li>
                <li>Build your mentor profile</li>
              </ul>
            </Card>
          </Col>

        </Row>

        <Button
          type="primary"
          size="large"
          className={styles.continueBtn}
          disabled={!selectedRole}
          onClick={handleContinue}
        >
          <CheckOutlined/> Continue
        </Button>

        <div className={styles.loginSection}>
          <Text>
            Already have an account?{" "}
          </Text>

          <Link
            onClick={() => navigate("/login")}
          >
            Login
          </Link>
        </div>

        {/* <div className={styles.benefitsRow}>

          <div className={styles.benefit}>
            <TeamOutlined />
            <span>Expert Mentors</span>
          </div>

          <div className={styles.benefit}>
            <CalendarOutlined />
            <span>Flexible Scheduling</span>
          </div>

          <div className={styles.benefit}>
            <RocketOutlined />
            <span>Personalized Growth</span>
          </div>

        </div> */}

      </div>

    </div>
  );
};

export default RoleSelection;