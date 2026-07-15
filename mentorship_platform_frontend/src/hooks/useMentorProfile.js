import { useEffect, useState } from "react";

import {
  getMentorApi,
  getSlotsApi,
  addSlotApi
} from "../api/mentorApi";

import { refreshSlots } from "../services/slotService";


const useMentorProfile = (id) => {

  const [mentor, setMentor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const mentorRes = await getMentorApi(id);
        setMentor(mentorRes.data);

        const slotRes = await getSlotsApi(id);
        setSlots(slotRes.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, [id]);

  return {
    mentor,
    slots,
    setSlots,
    loading
  };
};



export default useMentorProfile;