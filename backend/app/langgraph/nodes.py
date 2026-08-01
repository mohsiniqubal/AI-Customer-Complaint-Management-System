import json

from app.ai.extractor import extract_complaint


def extract_node(state):
    result = extract_complaint(state["complaint"])

    # If extractor returns a JSON string
    if isinstance(result, str):
        result = json.loads(result)

    return {
        "complaint": state["complaint"],
        "customer_name": result.get("customer_name", ""),
        "product_name": result.get("product_name", ""),
        "batch_number": result.get("batch_number", ""),
        "complaint_summary": result.get("complaint_summary", ""),
        "risk_level": result.get("risk_level", ""),
        "recommendation": result.get("recommendation", "")
    }