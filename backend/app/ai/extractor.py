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

    print("\n===== RAW LLM RESPONSE =====")
    print(content)
    print("============================\n")

    # Remove markdown code fences
    content = re.sub(r"^```(?:json)?\s*", "", content)
    content = re.sub(r"\s*```$", "", content)
    content = content.strip()

    print("\n===== CLEANED JSON =====")
    print(content)
    print("========================\n")

    try:
        return json.loads(content)

    except Exception as e:
        print("JSON ERROR:", e)

        return {
            "customer_name": "Not Provided",
            "product_name": "Not Provided",
            "batch_number": "Not Provided",
            "complaint_summary": content[:200],
            "risk_level": "Medium",
            "recommendation": "Review complaint manually.",
            "raw_response": content,
        }