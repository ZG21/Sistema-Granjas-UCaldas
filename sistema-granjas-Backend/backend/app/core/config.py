from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str

    class Config:
        env_file = ".env"
        extra = 'allow'  # O 'ignore' si quieres que simplemente las omita.

settings = Settings()
