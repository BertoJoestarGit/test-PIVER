import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Enum, JSON, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class EventType(str, enum.Enum):
    login = "login"
    transaction = "transaction"
    report = "report"


class Event(Base):
    __tablename__ = "events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=False)
    type = Column(Enum(EventType), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    payload = Column(JSON, nullable=True)