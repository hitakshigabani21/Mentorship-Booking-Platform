import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  LoginOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import { Input, Button } from "antd";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className={styles.navbar}>

      {/* LEFT - LOGO */}
      <div className={styles.left}>
        <div className={styles.logo}>
          Mentorly
        </div>
      </div>

      {/* CENTER - LINKS */}
      <div className={styles.center}>
        <div className={styles.links}>

          {role!=="mentor"&& (
            <Link to="/?section=home">
              <HomeOutlined /> Home
            </Link>
          )}

          {role === "mentor" && (
            <Link to="/mentor-profile">
              <HomeOutlined /> Home
            </Link>
          )}

          {role !== "mentor" && (
            <Link to="/?section=mentors">
              <TeamOutlined /> Mentors
            </Link>
          )}

          {/* STUDENT */}
          {role === "student" && (
            <Link to="/my-bookings">
              <CalendarOutlined /> My Bookings
            </Link>
          )}

          {/* MENTOR */}
          {role === "mentor" && (
            <Link to="/mentor-profile">
              <CalendarOutlined /> Manage Slots
            </Link>
          )}

          {role === "mentor" && (
            <Link>
              <CalendarOutlined/> My Sessions
            </Link>
          )}


        </div>
      </div>

      {/* RIGHT - SEARCH + ACTIONS */}
      <div className={styles.right}>

        {role==="student" && (
          <div className={styles.searchBox}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search mentors..."
              allowClear
            />
          </div>
        )}

        {!isLoggedIn ? (
          <Link to="/signup">
            <Button className={styles.ctaBtn}>
              Get Started
            </Button>
          </Link>
        ) : (
          <>
            {role === "student" && (
              <Link to="/profile">
                <div className={styles.profile}>
                  <UserOutlined />
                </div>
              </Link>
            )}

            <Button
              danger
              className={styles.logoutBtn}
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}

      </div>

      {/* MOBILE MENU ICON */}
      <div
        className={styles.menuIcon}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <CloseOutlined />
        ) : (
          <MenuOutlined />
        )}
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className={styles.mobileMenu}>

          {role !== "mentor" && (
            <Link
            to="/?section=home"
            onClick={() => setOpen(false)}
          >
            <HomeOutlined /> Home
          </Link>
          )}

          {role === "mentor" && (
            <Link to="/mentor-profile">
              <HomeOutlined /> Home
            </Link>
          )}

          {role !== "mentor" && (
            <Link
              to="/?section=mentors"
              onClick={() => setOpen(false)}
            >
              <TeamOutlined /> Mentors
            </Link>
          )}

          {/* STUDENT */}
          {role === "student" && (
            <Link
              to="/my-bookings"
              onClick={() => setOpen(false)}
            >
              <CalendarOutlined /> My Bookings
            </Link>
          )}

          {/* MENTOR */}
          {role === "mentor" && (
            <Link
              to="/mentor-profile"
              onClick={() => setOpen(false)}
            >
              <CalendarOutlined /> Manage Slots
            </Link>
          )}

          {role === "mentor" && (
            <Link>
              <CalendarOutlined/> My Sessions
            </Link>
          )}

          {!isLoggedIn ? (
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
            >
              <LoginOutlined /> Get Started
            </Link>
          ) : (
            <>
              {role === "student" && (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                >
                  <UserOutlined /> Profile
                </Link>
              )}

              <Button
                danger
                block
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}

        </div>
      )}

    </div>
  );
};

export default Navbar;