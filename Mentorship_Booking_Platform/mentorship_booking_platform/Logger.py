import logging

logging.basicConfig(
    filename="MentorshipBooking.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)
logger.info("Logger Initialized")