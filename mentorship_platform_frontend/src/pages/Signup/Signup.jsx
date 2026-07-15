import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  Form,
  Input,
  Select,
  message
} from "antd";

import {
  ArrowLeftOutlined,
  UserOutlined,
  SolutionOutlined
} from "@ant-design/icons";

import { registerMentor, registerStudent } from "../../api/authApi";

import styles from "./Signup.module.css";

const { Title, Text } = Typography;
const {TextArea} = Input;


const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role;
  const onFinish = async (values) => {
try{
  if(role === "student") {

    const payload = {
      S_Name: values.name,
      S_Email: values.email,
      S_Phone: values.phone,
      S_College: values.college,
      S_Branch: values.branch,
      S_Year: values.year,
      S_Password: values.password
    };

    await registerStudent(payload);

    message.success(
      "Student account created successfully!"
    )
  }

  else {

    const payload = {
      M_Name: values.name,
      M_Email: values.email,
      M_Phone: values.phone,
      M_Expertise_Id: values.expertise,
      M_ExperienceYears: Number(values.experience),
      M_Bio: values.bio,
      M_Language: values.language,
      M_Password: values.password
    };

    await registerMentor(payload);
    message.success(
      "Mentor account created successfully!"
    );
  }

  setTimeout(() => {
      navigate("/login");
    }, 1500);

  }
  catch(error) {

    console.error(error);

    message.error(
      "Something went wrong. Please try again."
    );
  }
};

  useEffect(() => {
    if (!role) {
      navigate("/signup");
    }
  }, [role]);

  return (
    <div className={styles.page}>

      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className={styles.backBtn}
        onClick={() => navigate("/signup")}
      >
        Back
      </Button>

      <div className={styles.hero}>
        <Text className={styles.step}>
          STEP 2 OF 2
        </Text>

        <Title className={styles.heading}>
          Create Your Account
        </Title>

        <Text className={styles.subHeading}>
          Complete your profile details
        </Text>
      </div>

      <Card className={styles.formCard}>

        <div className={styles.roleBadge}>
          {role === "student" ? (
            <>
              <UserOutlined />
              <span>Create Student Account</span>
            </>
          ) : (
            <>
              <SolutionOutlined />
              <span>Create Mentor Account</span>
            </>
          )}
        </div>

      <Form
        layout="vertical"
        className={styles.form}
        onFinish={onFinish}
      >

        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name"
            }
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your full name"
          />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email"
            },
            {
              type: "email",
              message: "Enter a valid email"
            }
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter password"
            },{
              min:8,
              message: "Password must be atleast 8 characters"
            }
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Create password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm password"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue("password") === value
                ) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(
                    "Passwords do not match"
                  )
                );
              }
            })
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Confirm password"
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone number"
            },{
              pattern: /^[6-9]\d{9}$/,
              message:
                "Enter a valid 10-digit mobile number"
            }
          ]}
        >
          <Input
            size="large"
            placeholder="Enter phone number"
            maxLength={10}
          />
        </Form.Item>

        {role === "student" && (
          <>
            <Form.Item
              label="College"
              name="college"
              rules={[
                {
                  required: true,
                  message: "Please enter college"
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Enter college name"
              />
            </Form.Item>
            <Form.Item
              label="Branch"
              name="branch"
              rules={[
                {
                  required: true,
                  message: "Please enter branch"
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Enter branch"
              />
            </Form.Item>
            <Form.Item
              label="Year"
              name="year"
              rules={[
                {
                  required: true,
                  message: "Please select year"
                }
              ]}
            >
              <Select
                size="large"
                placeholder="Select year"
                options={[
                  { value: 1, label: "First Year" },
                  { value: 2, label: "Second Year" },
                  { value: 3, label: "Third Year" },
                  { value: 4, label: "Fourth Year" }
                ]}
              />
            </Form.Item>
          </>
        )}

        {role === "mentor" && (
          <>
            <Form.Item
              label="Expertise"
              name="expertise"
            >
              <Select
                size="large"
                placeholder="Select expertise"
                options={[
                  {
                    value: 1,
                    label: "AI/Machine Learning"
                  },
                  {
                    value: 2,
                    label: "Web Development"
                  },
                  {
                    value: 3,
                    label: "Dev Ops"
                  },
                  {
                    value: 4,
                    label: "Cyber Security"
                  },
                  {
                    value: 5,
                    label: "Data Science"
                  }
                  ,{
                    value: 6,
                    label: "App Development"
                  }
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Years of Experience"
              name="experience"
            >
              <Input
                size="large"
                placeholder="e.g. 5"
              />
            </Form.Item>

            <Form.Item
              label="Short Bio"
              name="bio"
            >
              <TextArea
                rows={4}
                placeholder="Tell students about yourself"
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter phone number"
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Enter phone number"
              />
            </Form.Item>
            <Form.Item
              label="Language"
              name="language"
            >
              <Input
                size="large"
                placeholder="English, Hindi, Gujarati..."
              />
            </Form.Item>
          </>
        )}

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className={styles.submitBtn}
          block
        >
          Create Account
        </Button>

    </Form>

      
      </Card>

    </div>
  );
};

export default Signup;