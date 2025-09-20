from .queue import queue
from ..services.ai.openai_service import generate_layout_plan
from ..services.ai.stability_service import generate_styled_render


def job_generate_layouts(project_id: int, prompt: str) -> dict:
    plan = generate_layout_plan(prompt)
    render_url = generate_styled_render(prompt)
    return {"project_id": project_id, "plan": plan, "render_url": render_url}


