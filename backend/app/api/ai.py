from fastapi import APIRouter
from pydantic import BaseModel

from app.langgraph.workflow import graph

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class ComplaintInput(BaseModel):
    complaint: str


@router.post("/extract")
def ai_extract(data: ComplaintInput):

    result = graph.invoke(
        {
            "complaint": data.complaint
        }
    )

    return result