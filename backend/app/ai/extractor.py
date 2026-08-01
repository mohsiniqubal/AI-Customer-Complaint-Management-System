import json
import re

from langchain_core.prompts import ChatPromptTemplate

from app.ai.groq_client import llm
from app.ai.prompts import EXTRACTION_PROMPT


def extract_complaint(complaint: str):
    prompt = ChatPromptTemplate.from_template(EXTRACTION_PROMPT)

    chain = prompt | llm

    response = chain.invoke(
        {
            "complaint": complaint
        }
    )

    content = response.content.strip()

    print("\n========== RAW LLM RESPONSE ==========")
    print(content)
    print("======================================\n")

    # Remove markdown code fences
    content = re.sub(r"^```json\s*", "", content, flags=re.IGNORECASE)
    content = re.sub(r"^```\s*", "", content)
    content = re.sub(r"\s*```$", "", content)

    content = content.strip()

    try:
        result = json.loads(content)

        print("\n========== PARSED JSON ==========")
        print(result)
        print("=================================\n")

        # If document is not a pharma complaint
        if result.get("valid_complaint") is False:
            return {
                "valid_complaint": False,
                "message": result.get(
                    "message",
                    "This document is not a pharmaceutical customer complaint."
                )
            }

        # Return extracted information
        return {
            "valid_complaint": True,
            "customer_name": result.get("customer_name", ""),
            "product_name": result.get("product_name", ""),
            "batch_number": result.get("batch_number", ""),
            "complaint_summary": result.get("complaint_summary", ""),
            "risk_level": result.get("risk_level", ""),
            "recommendation": result.get("recommendation", ""),
        }

    except json.JSONDecodeError as e:

        print("\n========== JSON ERROR ==========")
        print(e)
        print("RAW CONTENT:")
        print(content)
        print("================================\n")

        return {
            "valid_complaint": False,
            "message": "AI returned invalid JSON.",
            "customer_name": "",
            "product_name": "",
            "batch_number": "",
            "complaint_summary": "",
            "risk_level": "",
            "recommendation": "",
            "raw_response": content,
        }

    except Exception as e:

        print("\n========== UNKNOWN ERROR ==========")
        print(e)
        print("===================================\n")

        return {
            "valid_complaint": False,
            "message": str(e),
            "customer_name": "",
            "product_name": "",
            "batch_number": "",
            "complaint_summary": "",
            "risk_level": "",
            "recommendation": "",
        }