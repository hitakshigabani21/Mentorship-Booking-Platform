import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import MentorDetails from "../../components/MentorDetails/MentorDetails";
import { handleError } from "../../utils/errorHandler"
import { bookSessionApi, cancelBookingApi } from "../../api/mentorApi";
import { refreshSlots } from "../../services/slotService";
import { Tooltip, Card, Button, Modal, Input, Form, Tag, Popconfirm } from "antd";
import {EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Calender from "../../components/Calender/Calender";
import styles from "./MentorProfile.module.css";
import AboutMentorSection from "../../components/AboutMentorSection/AboutMentorSection";
import { formatTime } from "../../utils/formatTime";
import useMentorProfile from "../../hooks/useMentorProfile";
import useSlotActions from "../../hooks/useSlotActions";
import AddSlotModal from "../../components/AddSlotModal/AddSlotModal";
import SlotsSection from "../../components/SlotsSection/SlotsSection";
import useBookingActions from "../../hooks/useBookingActions";
import useSlotForm from "../../hooks/useSlotForm";

const MentorProfile = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    const mentorId = id || user?.user_id;
    const userId = user?.user_id;
    const currentStudentId = role === "student"? userId:null;
    const [topic, setTopic] = useState("");
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const {mentor, slots, setSlots, loading} = useMentorProfile(mentorId);
    const {addSlot, updateSlot, deleteSlot} = useSlotActions(mentorId, setSlots);
    const {isAddSlotModalOpen, editingSlotId, slotForm, setSlotForm, openAddSlotModal, openEditSlotModal, closeSlotModal} = useSlotForm();
    const {bookSession, cancelBooking} = useBookingActions(mentorId, currentStudentId, setSlots, selectedSlotId, topic, setIsBookingModalOpen);
    const isOwnProfile = role === "mentor" && Number(userId) === Number(mentorId);


    //step:3 frontend connection establish
    useEffect(() => {

    const socket = new WebSocket(
        "ws://127.0.0.1:8000/ws"   //3. establishes connection
    );

    socket.onopen = () => {
        console.log("WebSocket Connected");
    };
    //step-5: frontend receives the message
    socket.onmessage = async (event) => {

        const data = JSON.parse(event.data);

        console.log("Notification:", data);

        if (
            data.mentor_id === Number(mentorId)  //checks the event
        ) {

            await refreshSlots(
                mentorId,
                setSlots             //slots fetch karke vapas load karo this is a service here
            );
        }
    };

    socket.onerror = (error) => {
        console.log("WebSocket Error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket Closed");
    };

    return () => {
        socket.close();
    };

}, [mentorId]);

    const openBookingModal = (slotId) => {
      setSelectedSlotId(slotId);
      setTopic("");
      setIsBookingModalOpen(true);
    };
  const handleSlotSubmit =
    async () => {

    try {

      if (editingSlotId) {

        const data =
          await updateSlot(
            editingSlotId,
            {
              Sl_Date:
                slotForm.date,
              Sl_StartTime:
                slotForm.startTime,
              Sl_EndTime:
                slotForm.endTime
            }
          );

        alert(data.message);

      } else {

        const data =
          await addSlot({
            M_Id: mentor.M_Id,
            Sl_Date:
              slotForm.date,
            Sl_StartTime:
              slotForm.startTime,
            Sl_EndTime:
              slotForm.endTime
          });

        alert(data.message);
      }

      closeSlotModal();

    } catch (error) {

      handleError(error);

    }
  };

  const handleDeleteSlot =
    async (slotId) => {
      try {
        const data =
          await deleteSlot(slotId);
        alert(data.message);
      } catch (error) {
        handleError(error);
      }
  };

  const filteredSlots = slots.filter((slot) => {
    const isBookedByYou =
        slot.Booked_By === currentStudentId;
    if (role === "student") {
        return (
            slot.Sl_Status === "Available" ||
            isBookedByYou
        );
    }
    return true;
  });

  if (loading) {
        return <h2>Loading...</h2>;
    }

  if (!mentor) {
      return <h2>Mentor Not Found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <MentorDetails mentor={mentor} />
        <AboutMentorSection mentor={mentor} />

        {/* SLOT + CALENDAR */}

        <div className={styles.bookingSection}>
            {/*Calender */}
            <Card className={styles.calendarCard}>
                <Calender />
            </Card>

          {/* SLOTS */}

          <SlotsSection
            slots={filteredSlots}
            role={role}
            currentStudentId={currentStudentId}
            openAddSlotModal={openAddSlotModal}
            openEditSlotModal={openEditSlotModal}
            handleDeleteSlot={handleDeleteSlot}
            cancelBooking={cancelBooking}
            openBookingModal={openBookingModal}
            isOwnProfile={isOwnProfile}
          />

        </div>

      </div>

      <Modal
        title="Book Session"
        open={isBookingModalOpen}
        onCancel={() => setIsBookingModalOpen(false)}
        onOk={bookSession}
        okText="Confirm Booking"
      >

        <Form layout="vertical">

          <Form.Item label="Session Topic">

            <Input.TextArea
              rows={4}
              placeholder="Enter what you want help with..."
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
            />

          </Form.Item>

        </Form>

      </Modal>
      <AddSlotModal
        open={isAddSlotModalOpen}
        onCancel={ closeSlotModal}
        onSubmit={handleSlotSubmit}
        slotForm ={ slotForm }
        setSlotForm = {setSlotForm}
        isEditing={!!editingSlotId}
      />
      <Footer />
    </>
  );
};

export default MentorProfile;