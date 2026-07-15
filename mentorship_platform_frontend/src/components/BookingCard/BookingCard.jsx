import {
  Card,
  Typography,
  Tag,
  Button,
  Space
} from "antd";

import {
  CalendarOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

import styles from "./BookingCard.module.css";

const { Title, Text } = Typography;

const BookingCard = ({ booking }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div>
          <Title level={4}>
            {booking.mentor_name}
          </Title>

          <Text type="secondary">
            {booking.expertise}
          </Text>
        </div>

        <Tag color="blue">
          {booking.booking_status}
        </Tag>
      </div>

      <div className={styles.topic}>
        <Text strong>
          Topic:
        </Text>

        <Text>
          {booking.topic}
        </Text>
      </div>

      <Space
        direction="vertical"
        size={4}
      >
        <Text>
          <CalendarOutlined />
          {" "}
          {booking.session_date}
        </Text>

        <Text>
          <ClockCircleOutlined />
          {" "}
          {booking.start_time}
          {" - "}
          {booking.end_time}
        </Text>
      </Space>

      <div className={styles.actions}>
        <Button>
          View Mentor
        </Button>

        <Button danger>
          Cancel Booking
        </Button>
      </div>
    </Card>
  );
};

export default BookingCard;