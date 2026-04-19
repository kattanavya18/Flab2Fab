from fastapi import APIRouter, Depends
from app.schemas.health import (
    HealthRequest, HealthResponse, ReasonPoint, 
    ActionItem, ShiftItem, ImpactItem
)
from app.services.llm import llm_service

router = APIRouter()

@router.post("/assess", response_model=HealthResponse)
async def assess_health(data: HealthRequest):
    # --- 1. DETERMINISTIC LOGIC (FACTS ONLY) ---
    
    # BMI Calculation
    try:
        weight_kg = float(data.weight)
        height_cm = float(data.height)
        height_m = height_cm / 100
        bmi_num = weight_kg / (height_m * height_m) if height_m > 0 else 0
        bmi_str = f"{bmi_num:.1f}"
    except ValueError:
        bmi_num = 0
        bmi_str = "0.0"

    # Health Score Calculation (Logic Rules)
    score = 60
    logic_facts = []

    # Exercise logic
    if "Daily" in data.exercise or "3-4x" in data.exercise: 
        score += 15
        logic_facts.append(f"Exercises {data.exercise}")
    else:
        score -= 5
        logic_facts.append("Movement frequency below optimal threshold")

    # Sleep logic
    if "8+" in data.sleep or "7-8" in data.sleep: 
        score += 15
        logic_facts.append(f"Sleep duration ({data.sleep}) meets recovery needs")
    else:
        score -= 10
        logic_facts.append(f"Sleep duration ({data.sleep}) below recommended recovery threshold")

    # Diet & BMI logic
    if bmi_num >= 18.5 and bmi_num <= 25:
        score += 10
        logic_facts.append("BMI within healthy target range")
    else:
        score -= 5
        logic_facts.append(f"BMI ({bmi_str}) outside optimal range")

    score = max(0, min(score, 100))

    # Category Logic
    if score >= 85:
        cat_label, cat_color = "OPTIMAL", "text-emerald-400"
    elif score >= 65:
        cat_label, cat_color = "MODERATE", "text-amber-400"
    else:
        cat_label, cat_color = "LOW", "text-rose-400"

    # Impact Analysis (Logic Based)
    impact_analysis = []
    if "Daily" not in data.exercise:
        impact_analysis.append(ImpactItem(gain="+12", text="Daily Movement", color="text-emerald-400"))
    if "8+" not in data.sleep:
        impact_analysis.append(ImpactItem(gain="+8", text="Deep Sleep 8h", color="text-indigo-400"))
    if "8+" not in data.waterIntake:
        impact_analysis.append(ImpactItem(gain="+5", text="Hydration Target", color="text-sky-400"))

    # --- 2. AI POWERED (REFINEMENT & INSIGHTS) ---
    ai_content = await llm_service.generate_assessment_content(data, score, bmi_str, logic_facts)

    # Convert AI output to schema objects
    reasons = [ReasonPoint(reason=r) for r in ai_content.get("polished_reasons", [])]
    actions = [ActionItem(index=i+1, text=a) for i, a in enumerate(ai_content.get("top_actions", []))]
    shifts = [ShiftItem(label=s["label"], value=s["value"], reason=s["reason"]) for s in ai_content.get("strategic_shifts", [])]

    return HealthResponse(
        score=score,
        category_label=cat_label,
        category_color=cat_color,
        bmi=bmi_str,
        ai_insight=ai_content.get("insight", "Analysis complete."),
        reasons=reasons,
        metrics={
            "BMI": bmi_str, 
            "Sleep": data.sleep, 
            "Exercise": data.exercise,
            "Goal": data.goal
        },
        actions=actions,
        shifts=shifts,
        impact_analysis=impact_analysis[:3]
    )
