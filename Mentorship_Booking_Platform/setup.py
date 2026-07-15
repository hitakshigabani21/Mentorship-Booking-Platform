from setuptools import setup, find_packages

setup(
    name="mentorhip_booking_platform",
    version="1.0.0",
    author="Hitakshi Gabani",
    description="Mentorship Booking Platform using FastAPI and SQLAlchemy",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.115.12",
        "uvicorn>=0.34.0",
        "sqlalchemy>=2.0.40",
        "pymysql>=1.2.0",
        "pydantic>=2.10.6"
    ],
    python_requires=">=3.12.6"
)