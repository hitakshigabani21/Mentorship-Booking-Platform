import {
  Card, Button, Tooltip, Tag, Popconfirm
} from "antd";

import {
  EditOutlined, DeleteOutlined, PlusOutlined
} from "@ant-design/icons";

import { formatTime } from "../../utils/formatTime";

import styles from "../../pages/MentorProfile/MentorProfile.module.css";

const SlotsSection = ({
  slots,
  role,
  currentStudentId,
  openAddSlotModal,
  openEditSlotModal,
  deleteSlot,
  cancelBooking,
  openBookingModal,
  isOwnProfile}) =>{
    return (
        <Card className={styles.slotsCard}>
            <div className={styles.slotHeader}>

                <h2>{role === "student" ? "Book a Session" : isOwnProfile? "Manage Availability" : "Available Sessions"}</h2>
                {
                  isOwnProfile && (
                    <Button
                      icon={<PlusOutlined />}
                      className={styles.addSlotBtn}
                      onClick={() =>
                        openAddSlotModal()
                      }
                    >
                      Add Slot
                    </Button>
                  )
                }

            </div>

            <div
              id="slots-section"
              className={styles.slotList}
            >

              {
                slots.length === 0 ? (

                    <div className={styles.noSlots}>
                    No available sessions at the moment.
                    </div>

                ):( 
              
              slots.map((slot) => {
                const isBookedByYou =
                role === "student" && slot.Booked_By === currentStudentId;
                return (
                    <div key={slot.Sl_Id} className={styles.slotRow}>

                    {isOwnProfile && (
                      <div className={styles.slotActions}>
                        <Tooltip
                          title={
                            slot.Sl_Status === "Booked"
                              ? "Booked slots cannot be edited"
                              : "Edit Slot"
                          }
                        >
                          <Button
                          type="text"
                          icon={<EditOutlined />}
                          className={styles.iconBtn}
                          onClick = {()=> openEditSlotModal(slot)}
                          disabled={slot.Sl_Status === "Booked"}
                          />
                      </Tooltip>
                      <Popconfirm 
                        title="Delete Slot"
                        description="Are you sure you want to delete this slot?"
                        onConfirm={()=> handleDeleteSlot(slot.Sl_Id)}
                        okText="Yes"
                        cancelText="No"
                        >
                          <Tooltip title = {
                            slot.Sl_Status === "Booked" ? "Booked Slots cannot be deleted": "Delete Slot"
                          }>
                            <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            className={styles.iconBtn}
                            disabled={
                              slot.Sl_Status === "Booked"
                            }
                            />
                          </Tooltip>
                        </Popconfirm>
                    </div>
                    )}

                    <div className={styles.slotInfo}>

                        <h3 className={styles.slotDate}>
                        {new Date(slot.Sl_Date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                        </h3>

                        {isBookedByYou && (
                        <p className={styles.bookedByYou}>
                            Your upcoming Session
                        </p>
                        )}

                        <p className={styles.slotTime}>
                        {formatTime(slot.Sl_StartTime)} - {formatTime(slot.Sl_EndTime)}
                        </p>

                        <Tag
                        className={styles.slotStatus}
                        color={isBookedByYou? "blue" :slot.Sl_Status === "Available" ? "green" : "red"}
                        >
                        {isBookedByYou ? "Booked by You" : slot.Sl_Status}
                        </Tag>

                        {
                          isOwnProfile &&
                          slot.Sl_Status === "Booked" && (
                              <div className={styles.bookingInfo}>
                                  <p>
                                      <strong>Student:</strong>{" "}
                                      {slot.Student_Name}
                                  </p>

                                  <p>
                                      <strong>Topic:</strong>{" "}
                                      {slot.Topic}
                                  </p>
                              </div>
                          )
                      }

                    </div>

                    {role === "student" && (
                      <Button
                        className={
                        isBookedByYou ? styles.cancelBtn : styles.slotBtn
                        }
                        onClick={() => {
                          if (isBookedByYou) {
                            cancelBooking(slot.Booking_Id);
                          } else {
                            openBookingModal(slot.Sl_Id);
                          }
                        }}
                        disabled={slot.Sl_Status === "Booked" && !isBookedByYou}
                    >
                        {slot.Sl_Status === "Available"
                        ? "Book Session"
                        : isBookedByYou
                        ? "Cancel Booking"
                        : "Booked"}
                    </Button>
                    )}

                    </div>
                );
                }))
                
            
            }

            </div>
          </Card>
    )
}

export default SlotsSection;






