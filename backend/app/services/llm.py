import time
import json
from huggingface_hub import InferenceClient
from app.core.config import settings
from app.schemas.health import HealthRequest


class LLMService:
    """Service for generating AI-powered health insights using Hugging Face models."""

    def __init__(self):
        self.max_retries = 3

    async def generate_assessment_content(self, data: HealthRequest, score: int, bmi: str, logic_reasons: list) -> dict:
        """Generate a personalized health insight and recommendations based on user data and score."""
        token = settings.HUGGINGFACE_API_KEY.strip()
        model_id = settings.HF_MODEL_ID.strip()

        if not token:
            return self._get_fallback_content(data.goal)

        # Prepare a structured prompt with logic-driven facts
        facts_str = "\n".join([f"- {r}" for r in logic_reasons])
        
        system_prompt = (
            "You are an elite health and fitness AI. Your task is to provide a structured health assessment. "
            "You must return ONLY a JSON object with the following keys: "
            "'insight' (2-sentence headline), "
            "'polished_reasons' (list of 3 polished strings based on the provided facts), "
            "'top_actions' (list of 3 specific action strings), "
            "'strategic_shifts' (list of 3 objects with 'label', 'value', and 'reason')."
        )
        
        user_content = (
            f"User Profile:\nGoal: {data.goal}\nDiet: {data.diet}\nExercise: {data.exercise}\n"
            f"Sleep: {data.sleep}\nStress: {data.stressLevel}\nHealth Score: {score}/100\nBMI: {bmi}\n\n"
            f"Logic-Driven Facts (DO NOT CHANGE THESE FACTS, ONLY POLISH WORDING):\n{facts_str}"
        )

        for attempt in range(1, self.max_retries + 1):
            try:
                client = InferenceClient(token=token)
                response = client.chat_completion(
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_content}
                    ],
                    model=model_id,
                    max_tokens=1000,
                    response_format={"type": "json_object"}
                )

                content = response.choices[0].message.content.strip()
                # Try to parse the JSON
                try:
                    # Some models might wrap JSON in code blocks
                    if "```json" in content:
                        content = content.split("```json")[1].split("```")[0].strip()
                    elif "```" in content:
                        content = content.split("```")[1].split("```")[0].strip()
                    
                    return json.loads(content)
                except json.JSONDecodeError:
                    print(f"DEBUG: JSON decode error on attempt {attempt}")
                    continue

            except Exception as e:
                error_msg = str(e).lower()
                if "loading" in error_msg or "503" in error_msg:
                    time.sleep(5 * attempt)
                    continue
                break

        return self._get_fallback_content(data.goal)

    def _get_fallback_content(self, goal: str) -> dict:
        return {
            "insight": f"Strategic analysis complete. Focus on {goal.lower()} through consistent small wins.",
            "polished_reasons": ["Analysis based on physiological baseline", "Metric synchronization in progress"],
            "top_actions": ["Establish consistent movement", "Optimize recovery windows", "Track nutritional intake"],
            "strategic_shifts": [
                {"label": "Diet", "value": "Whole Foods", "reason": "Base metabolic support"},
                {"label": "Exercise", "value": "Foundational", "reason": "Structural integrity"},
                {"label": "Lifestyle", "value": "Sleep", "reason": "Recovery optimization"}
            ]
        }


llm_service = LLMService()
