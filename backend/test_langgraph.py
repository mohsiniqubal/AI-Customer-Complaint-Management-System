from app.langgraph.workflow import graph

result = graph.invoke(
    {
        "complaint": "Customer received broken tablets inside blister pack. Batch PCM2026001 Product Paracetamol 500mg."
    }
)

print(result)