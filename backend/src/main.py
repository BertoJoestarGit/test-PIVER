from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import engine
from db.models import Base
from api.events import router as events_router
from api.users import router as users_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(events_router)
app.include_router(users_router)

@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)