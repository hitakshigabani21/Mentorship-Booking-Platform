import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useStudentProfile from "../../hooks/useStudentProfile";
import StudentProfileHeader from "../../components/StudentProfileHeader/StudentProfileHeader";
import StudentPersonalInfo from "../../components/StudentPersonalInfo/StudentPersonalInfo";
import styles from "./StudentProfile.module.css";

const StudentProfile = () => {
  const {student, loading} = useStudentProfile();
  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    <>
      <Navbar />

      <div className={styles.container}>

        <StudentProfileHeader student={student} />

        <StudentPersonalInfo student={student}/>

      </div>

      <Footer />
    </>
  );
};

export default StudentProfile;