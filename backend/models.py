from sqlalchemy import Column, Integer, String, Float, DateTime, Date
from database import Base
from datetime import datetime

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(String, unique=True, index=True)
    title = Column(String)
    channel = Column(String)
    duration = Column(Integer)  # seconds
    views = Column(Integer)
    likes = Column(Integer)
    comments = Column(Integer)
    engagement_ratio = Column(Float)
    upload_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)


