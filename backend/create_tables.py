from app.database.db import Base, engine
from app.models.complaint import Complaint

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")