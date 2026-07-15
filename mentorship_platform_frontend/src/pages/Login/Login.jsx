import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {message} from "antd";
import {loginUser} from "../../api/authApi";

import {
  Card,
  Typography,
  Button,
  Form,
  Input,
  Segmented
} from "antd";

import {
  ArrowLeftOutlined,
  LoginOutlined
} from "@ant-design/icons";

import styles from "./Login.module.css";

const { Title, Text, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const onFinish = async (values) => {
    try {

      const response = await loginUser({
        role,
        email: values.email,
        password: values.password
      });

      localStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      message.success(response.message);

      setTimeout(() => {
        if (response.role === "mentor") {
          navigate("/mentor-profile");
        } else {
          navigate("/");
        }
      }, 1500);


    } catch(error) {

      message.error(
        error.response?.data?.detail ||
        "Login failed"
      );

    }
  };

  return (
    <div className={styles.page}>

      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className={styles.backBtn}
        onClick={() => navigate("/")}
      >
        Back
      </Button>

      <div className={styles.hero}>

        <Title className={styles.heading}>
          Welcome Back
        </Title>

        <Text className={styles.subHeading}>
          Login to continue your mentorship journey
        </Text>
      </div>

      <Card className={styles.loginCard}>

        <Segmented
          block
          size="large"
          value={role}
          onChange={setRole}
          options={[
            {
              label: "Student",
              value: "student"
            },
            {
              label: "Mentor",
              value: "mentor"
            }
          ]}
        />

        <Form
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
        >

          <Form.Item
            label="Email Address"
            name="email"
          >
            <Input
              size="large"
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password
              size="large"
              placeholder="Enter password"
            />
          </Form.Item>

          <div className={styles.forgotWrapper}>
            <Link>Forgot Password?</Link>
          </div>

          <Button
            block
            size="large"
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            className={styles.loginBtn}
          >
            Login
          </Button>

        </Form>

        <div className={styles.footer}>
          <Text>
            Don't have an account?
          </Text>

          <Link
            onClick={() =>
              navigate("/signup")
            }
          >
            Create Account
          </Link>
        </div>

      </Card>

    </div>
  );
};

export default Login;