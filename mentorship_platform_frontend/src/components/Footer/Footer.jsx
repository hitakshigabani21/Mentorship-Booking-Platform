import {
  LinkedinFilled,
  InstagramFilled,
  TwitterCircleFilled,
  MailFilled,
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  UserOutlined
} from "@ant-design/icons";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* BRAND */}
        <div className={styles.column}>
          <h2 className={styles.logo}>Mentorly</h2>

          <p className={styles.desc}>
            Connecting students with experienced industry
            mentors through personalized 1:1 guidance,
            structured learning, and career-focused mentorship.
          </p>

          <div className={styles.socials}>
            <LinkedinFilled />
            <TwitterCircleFilled />
            <InstagramFilled />
            <MailFilled />
          </div>
        </div>

        {/* LINKS */}
        <div className={styles.column}>
          <h3>Quick Links</h3>

          <a href="#home">
            <HomeOutlined />
            Home
          </a>

          <a href="#mentors">
            <TeamOutlined />
            Mentors
          </a>

          <a href="/">
            <CalendarOutlined />
            Sessions
          </a>

          <a href="/">
            <MailFilled />
            Contact
          </a>
        </div>

        {/* MENTORS */}
        <div className={styles.column}>
          <h3>For Mentors</h3>

          <a href="/">
            <UserOutlined />
            Become a Mentor
          </a>

          <a href="/">
            <CalendarOutlined />
            Manage Slots
          </a>

          <a href="/">
            <TeamOutlined />
            Mentor Dashboard
          </a>
        </div>

        {/* SUPPORT */}
        <div className={styles.column}>
          <h3>Resources</h3>

          <a href="/">FAQs</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
          <a href="/">Help Center</a>
        </div>

      </div>

      <div className={styles.bottomBar}>
        © 2026 Mentorly. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;