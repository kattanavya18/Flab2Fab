from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Flab2Fab API"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True
    
    # LLM
    HUGGINGFACE_API_KEY: str = ""
    HF_MODEL_ID: str = "mistralai/Mistral-7B-Instruct-v0.2"
    
    # Security
    SECRET_KEY: str = "secret"
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
