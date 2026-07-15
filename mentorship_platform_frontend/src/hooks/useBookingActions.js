import { bookSessionApi, cancelBookingApi }
from "../api/mentorApi";

import { refreshSlots }
from "../services/slotService";

import { handleError }
from "../utils/errorHandler";

const useBookingActions = (
  mentorId,
  currentStudentId,
  setSlots,
  selectedSlotId,
  topic,
  setIsBookingModalOpen
) => {

    const bookSession = async () => {
        try {
            const response = await bookSessionApi(
            currentStudentId,
            selectedSlotId,
            topic
            );
            alert(response.data.message);
            setIsBookingModalOpen(false);
            await refreshSlots(mentorId, setSlots);
        } catch (error) {
            handleError(error);
        }
    };

    const cancelBooking = async (bookingId) => {
        try {
            const response = await cancelBookingApi(bookingId, currentStudentId);
            alert(response.data.message);
            // Refresh slots
            await refreshSlots(mentorId, setSlots);
        } catch (error) {
            handleError(error);
        }
    };

    return {bookSession, cancelBooking};
};

export default useBookingActions;