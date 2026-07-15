import axios from "axios";
import { CONFIG } from "../config"

const BASE_URL = CONFIG.BASE_URL;

// Student Signup
export const registerStudent = async (studentData) => {
  return axios.post(
    `${BASE_URL}/addstudent`,
    studentData
  );
};

// Mentor Signup
export const registerMentor = async (mentorData) => {
  return axios.post(
    `${BASE_URL}/addmentor`,
    mentorData
  );
};

export const loginUser = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    payload
  );

  return response.data;
};