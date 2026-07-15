import { useState } from "react";

const useSlotForm = () => {
    const [topic, setTopic] = useState("");
    const [selectedSlotId, setSelectedSlotId] = useState(null)
    const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);
    const [editingSlotId, setEditingSlotId] = useState(null);
    const [slotForm, setSlotForm] = useState({
        date: "",
        startTime: "",
        endTime: ""
    });

      const openAddSlotModal = () => {
          setEditingSlotId(null);
          setSlotForm({
            date: "",
            startTime: "",
            endTime: ""
          });
    
          setIsAddSlotModalOpen(true);
        };
    
        const openEditSlotModal = (
          slot
        ) => {
    
          setEditingSlotId(slot.Sl_Id);
    
          setSlotForm({
            date: slot.Sl_Date,
            startTime:
              slot.Sl_StartTime.slice(0, 5),
            endTime:
              slot.Sl_EndTime.slice(0, 5)
          });
    
          setIsAddSlotModalOpen(true);
        };

        const closeSlotModal = () => {
            setIsAddSlotModalOpen(false);
            setEditingSlotId(null);
            setSlotForm({
                date: "",
                startTime: "",
                endTime: ""
                });
            };

    return {isAddSlotModalOpen, editingSlotId, slotForm, setSlotForm, openAddSlotModal, openEditSlotModal, closeSlotModal};
        
};

export default useSlotForm;
