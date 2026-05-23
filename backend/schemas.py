from pydantic import BaseModel
from datetime import date

class VideoBase(BaseModel):
    video_id: str
    title: str
    channel: str
    duration: int
    views: int
    likes: int
    comments: int
    upload_date: date

class VideoCreate(VideoBase):
    pass

class VideoResponse(VideoBase):
    engagement_ratio: float
    class Config:
        orm_mode = True
