import {
  Card,
  Descriptions
} from "antd";

const StudentPersonalInfo = ({ student }) => {

  return (
    <Card title="Personal Information">

      <Descriptions
        column={1}
      >
        <Descriptions.Item label="Email">
          {student.S_Email}
        </Descriptions.Item>

        <Descriptions.Item label="Phone">
          {student.S_Phone}
        </Descriptions.Item>

        <Descriptions.Item label="College">
          {student.S_College}
        </Descriptions.Item>

        <Descriptions.Item label="Branch">
          {student.S_Branch}
        </Descriptions.Item>

        <Descriptions.Item label="Year">
          {student.S_Year}
        </Descriptions.Item>

      </Descriptions>

    </Card>
  );
};

export default StudentPersonalInfo;