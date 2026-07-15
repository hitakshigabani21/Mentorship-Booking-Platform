import { useEffect, useState } from "react";
import { getStudentById } from "../api/studentApi";

const useStudentProfile = () => {

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const data =
        await getStudentById(
          user.user_id
        );

      setStudent(data);

    } catch(error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return {
    student,
    loading
  };
};

export default useStudentProfile;