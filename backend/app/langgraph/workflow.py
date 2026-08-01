from langgraph.graph import StateGraph, END

from app.langgraph.state import ComplaintState
from app.langgraph.nodes import extract_node

workflow = StateGraph(ComplaintState)

workflow.add_node("extract", extract_node)

workflow.set_entry_point("extract")

workflow.add_edge("extract", END)

graph = workflow.compile()