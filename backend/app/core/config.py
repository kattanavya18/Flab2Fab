from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Flab2Fab API"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # LLM
    HUGGINGFACE_API_KEY: str = ""
    HF_MODEL_ID: str = ""
    
    # Security
    # In production, this MUST be set via environment variable
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
    
    # In production, this should be your frontend URL
    # Can be "*" or a comma-separated string
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
