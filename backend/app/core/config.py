from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Chaar Chulha"
    API_V1_STR: str = "/api/v1"
    
    # Database
    # Using asyncpg driver for async operations
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/chaarchulha"

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
