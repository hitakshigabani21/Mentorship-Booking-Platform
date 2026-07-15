import axios from "axios";
import {CONFIG} from "../config";

const API = axios.create({
  baseURL: CONFIG.BASE_URL,
});

export const getAllMentors = () =>
  API.get("/mentors");

export const getMentorApi = (mentorId) =>
  API.get(`/mentors/${mentorId}`);

export const getSlotsApi = (mentorId) =>
  API.get(`/mentors/${mentorId}/slots`);

export const bookSessionApi = (
  studentId,
  slotId,
  topic
) =>
  API.post("/booksession", {
    S_Id: studentId,
    Sl_Id: slotId,
    B_Topic: topic
  });

export const cancelBookingApi = (
  bookingId,
  studentId
) =>
  API.put(
    `/bookings/${bookingId}/cancel?student_id=${studentId}`
  );

export const addSlotApi = (slotData) =>
  API.post("/addslot", slotData);

export const updateSlotApi = (slotId, slotData) =>
  API.put(
    `/slots/${slotId}`,
    slotData
  );

export const deleteSlotApi = (
  slotId
) =>
  API.delete(
    `/slots/${slotId}`
  );