from app.ai.extractor import extract_complaint

complaint = """
Customer received broken tablets inside the blister pack.
Batch number PCM2026001.
Product Paracetamol 500mg.
"""

result = extract_complaint(complaint)

print(result)