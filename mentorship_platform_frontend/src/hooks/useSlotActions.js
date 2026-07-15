import { addSlotApi, updateSlotApi, deleteSlotApi } from "../api/mentorApi";
import { refreshSlots } from "../services/slotService";
const useSlotActions = (mentorId, setSlots) => {

    //function for adding slot
  const addSlot = async (slotData) => {
    const response = await addSlotApi(slotData);
    await refreshSlots(mentorId, setSlots);
    return response.data;
  };
  //function for updating slot
  const updateSlot = async (slotId, slotData) => {
    const response = await updateSlotApi(slotId, slotData);
    await refreshSlots(mentorId, setSlots);
    return response.data;
  };

  //function to delete the slot
  const deleteSlot = async (
    slotId
    ) => {

    const response =
        await deleteSlotApi(slotId);

    await refreshSlots(
        mentorId,
        setSlots
    );

    return response.data;
};

  return { addSlot, updateSlot, deleteSlot };
  
};

export default useSlotActions;