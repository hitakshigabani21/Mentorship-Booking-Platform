import axios from "axios";
import {CONFIG} from "../config";

const BASE_URL = CONFIG.BASE_URL;
export const getStudentById = async (
  studentId
) => {

  const response = await axios.get(
    `${BASE_URL}/students/${studentId}`
  );

  return response.data;
};