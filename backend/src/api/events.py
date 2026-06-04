from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from db.database import get_db
from db.models import Event, EventType

router = APIRouter()

class NewEvent(BaseModel):
    user_id: str
    type: EventType
    payload: Optional[dict] = None

@router.post("/events")
def post_event(event: NewEvent, db: Session = Depends(get_db)):
    db_event = Event(
        user_id=event.user_id,
        type=event.type,
        payload=event.payload
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/events")
def get_events(user_id: Optional[str] = None, type: Optional[EventType] = None, db: Session = Depends(get_db)):
    query = db.query(Event)
    if type:
        query = query.filter(Event.type == type)
    if user_id:
        query = query.filter(Event.user_id == user_id)
    return query.all()