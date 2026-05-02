from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Flab2Fab API"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # LLM
    HUGGINGFACE_API_KEY: str = ""
    HF_MODEL_ID: str = "mistralai/Mistral-7B-Instruct-v0.2"
    
    # Security
    # In production, this MUST be set via environment variable
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
    
    # In production, this should be your frontend URL
    # Can be a comma-separated string in environment variable
    CORS_ORIGINS: List[str] = [
        origin.strip() 
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173").split(",")
    ]

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
