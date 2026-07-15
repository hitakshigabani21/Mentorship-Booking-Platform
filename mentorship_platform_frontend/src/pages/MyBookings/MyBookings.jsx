import { useEffect, useState } from "react";
import { Typography } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BookingCard from "../../components/BookingCard/BookingCard";

import { getStudentBookings } from "../../api/bookingApi";

import styles from "./MyBookings.module.css";

const { Title, Text } = Typography;

const MyBookings = () => {

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const data =
        await getStudentBookings(
          user.user_id
        );

      setBookings(data);

    } catch(error) {

      console.log(error);

    }
  };

  return (
    <>
        <Navbar/>
        <div className={styles.page}>

      <div className={styles.hero}>
        <Title>
          My Bookings
        </Title>

        <Text>
          Track and manage your mentorship
          sessions.
        </Text>
      </div>

      <div className={styles.grid}>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.booking_id}
            booking={booking}
          />
        ))}
      </div>

    </div>
    <Footer />
    </>
  );
};

export default MyBookings;