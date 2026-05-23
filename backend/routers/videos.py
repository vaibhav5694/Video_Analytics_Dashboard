from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base
from schemas import VideoCreate, VideoResponse
from crud import create_video, get_all_videos
from services.youtube_api import fetch_video_metadata

Base.metadata.create_all(bind=engine)

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=VideoResponse)
def add_video(video_url: str, db: Session = Depends(get_db)):
    metadata = fetch_video_metadata(video_url)
    video_data = VideoCreate(**metadata)
    return create_video(db, video_data)

@router.get("/", response_model=list[VideoResponse])
def list_videos(db: Session = Depends(get_db)):
    return get_all_videos(db)


