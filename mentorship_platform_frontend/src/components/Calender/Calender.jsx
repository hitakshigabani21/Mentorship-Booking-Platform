import { Calendar } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import styles from "./Calender.module.css";

const Calender = ({ onDateSelect }) => {

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleSelect = (value) => {
    setSelectedDate(value);

    if (onDateSelect) {
      onDateSelect(value.format("YYYY-MM-DD"));
    }
  };

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        fullscreen={false}
        value={selectedDate}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Calender;