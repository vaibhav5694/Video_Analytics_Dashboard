from sqlalchemy.orm import Session
from models import Video

def create_video(db: Session, video_data):
    engagement_ratio = (video_data.likes + video_data.comments) / max(video_data.views, 1)
    db_video = Video(**video_data.dict(), engagement_ratio=engagement_ratio)
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

def get_all_videos(db: Session):
    return db.query(Video).all()


