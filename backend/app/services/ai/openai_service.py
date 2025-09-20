from typing import Dict
import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def generate_layout_plan(prompt: str) -> Dict[str, str]:
    # Stub: return deterministic response for MVP without paid usage
    return {"plan": f"Generated plan for: {prompt}"}
