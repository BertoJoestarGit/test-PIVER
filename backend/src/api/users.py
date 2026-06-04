from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db
from db.models import Event

router = APIRouter()


@router.get("/users/{user_id}/summary")
def get_user_summary(user_id: str, db: Session = Depends(get_db)):
    events = db.query(Event).filter(Event.user_id == user_id).all()

    if not events:
        return {
            "user_id": user_id,
            "total_events": 0,
            "events_by_type": {},
            "first_event": None,
            "last_event": None,
        }

    types_count = {}
    for e in events:
        key = e.type
        types_count[key] = types_count.get(key, 0) + 1

    dates = []
    for e in events:
        dates.append(e.created_at)

    res = {
        "user_id": user_id,
        "total_events": len(events),
        "events_by_type": types_count,
        "first_event": min(dates),
        "last_event": max(dates),
    }

    return res