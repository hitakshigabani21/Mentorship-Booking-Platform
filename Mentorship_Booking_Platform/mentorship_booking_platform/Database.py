#This code is for the connection of the database.
from Logger import logger;
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from Configuration import db_host, db_port, db_user, db_password, db_name

DATABASE_URL = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

try:
    engine = create_engine(DATABASE_URL)
    logger.info("Database engine created successfully")
except Exception as e:
    logger.exception("Failed to create database engine")
    raise e

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()