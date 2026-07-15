import { getSlotsApi } from "../api/mentorApi";

export const refreshSlots = async (
  mentorId,
  setSlots
) => {

  const response = await getSlotsApi(mentorId);
  console.log("NEW SLOTS", response.data);
  setSlots(response.data);

};