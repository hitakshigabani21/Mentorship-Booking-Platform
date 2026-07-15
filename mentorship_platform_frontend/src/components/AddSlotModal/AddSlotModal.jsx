import { Modal, Form, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import styles from "./AddSlotModal.module.css";

const AddSlotModal = ({
  open,
  onCancel,
  onSubmit,
  slotForm,
  setSlotForm,
  isEditing
}) => {
  return (
    <Modal
      title={
        <span className={styles.modalTitle}>
            {
            isEditing
            ? "Edit Slot"
            : "Add New Slot"
            }
        </span>
      }
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      okText={
        isEditing ? "Update Slot": "Add Slot"
        }
      centered
      okButtonProps={{
        className: styles.addBtn
      }}
      cancelButtonProps={{
        className: styles.cancelBtn
      }}
    >
      <div className={styles.modalContent}>
        
        <Form layout="vertical">

          <Form.Item
            label={<span className={styles.formLabel}>Date</span>}
          >
            <Input
              className={styles.input}
              type="date"
              value={slotForm.date}
              onChange={(e) =>
                setSlotForm({
                  ...slotForm,
                  date: e.target.value
                })
              }
            />
          </Form.Item>

          <Form.Item
            label={<span className={styles.formLabel}>Start Time</span>}
          >
            <TimePicker
                use12Hours
                format="h:mm A"
                className={styles.timePicker}
                value={
                    slotForm.startTime
                    ? dayjs(slotForm.startTime, "HH:mm")
                    : null
                }
                onChange={(time) =>
                    setSlotForm({
                    ...slotForm,
                    startTime: time
                        ? time.format("HH:mm")
                        : ""
                    })
                }
            />
          </Form.Item>

          <Form.Item
            label={<span className={styles.formLabel}>End Time</span>}
          >
            <TimePicker
                use12Hours
                format="h:mm A"
                className={styles.timePicker}
                popupClassName={styles.timePopup}
                value={
                    slotForm.endTime
                    ? dayjs(slotForm.endTime, "HH:mm")
                    : null
                }
                onChange={(time) =>
                    setSlotForm({
                    ...slotForm,
                    endTime: time
                        ? time.format("HH:mm")
                        : ""
                    })
                }
            />
          </Form.Item>

        </Form>
      </div>
    </Modal>
  );
};

export default AddSlotModal;