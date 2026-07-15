import {
  Card,
  Avatar,
  Typography,
  Button
} from "antd";

import {
  UserOutlined,
  EditOutlined
} from "@ant-design/icons";

import styles from "./StudentProfileHeader.module.css";

const { Title, Text } = Typography;

const StudentProfileHeader = ({ student }) => {

  return (
    <Card className={styles.card}>
  <div className={styles.leftSection}>
    <Avatar
      size={120}
      icon={<UserOutlined />}
    />
  </div>

  <div className={styles.rightSection}>
    <Title level={2}>
      {student.S_Name}
    </Title>

    <Text className={styles.subtitle}>
      {student.S_Branch} Student • Year {student.S_Year}
    </Text>

    <Text className={styles.college}>
      {student.S_College}
    </Text>

    <div className={styles.actions}>
      <Button
        icon={<EditOutlined />}
        type="primary"
        className={styles.editBtn}
      >
        Edit Profile
      </Button>

      <Button>
        My Bookings
      </Button>
    </div>
  </div>
</Card>
  );
};

export default StudentProfileHeader;