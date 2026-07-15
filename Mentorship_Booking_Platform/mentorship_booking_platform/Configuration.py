import os
import configparser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(BASE_DIR, "data", "Config.ini")
config = configparser.RawConfigParser()

config.read(config_path)

# App Details
app_name = config["app"]["name"]
version = config["app"]["version"]

# Database Details
db_host = config["database"]["host"]
db_port = config["database"]["port"]
db_user = config["database"]["user"]
db_password = config["database"]["password"]
db_name = config["database"]["database"]

#Retry variables - Step-1: Define the variables
retry_tries = int(config["retry"]["max_retries"])
retry_delay = int(config["retry"]["initial_delay"])
retry_backoff = int(config["retry"]["backoff_factor"])