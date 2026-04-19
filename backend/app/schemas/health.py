from pydantic import BaseModel, Field
from typing import List, Optional

class HealthRequest(BaseModel):
    age: str
    height: str
    weight: str
    diet: str
    exercise: str
    dailyActivity: str
    waterIntake: str
    sleep: str
    stressLevel: str
    goal: str

class ActionItem(BaseModel):
    index: int
    text: str

class ReasonPoint(BaseModel):
    reason: str

class ShiftItem(BaseModel):
    label: str
    value: str
    reason: str

class ImpactItem(BaseModel):
    gain: str
    text: str
    color: str

class HealthResponse(BaseModel):
    score: int
    category_label: str
    category_color: str
    bmi: str
    ai_insight: str
    reasons: List[ReasonPoint]
    metrics: dict
    actions: List[ActionItem]
    shifts: List[ShiftItem]
    impact_analysis: List[ImpactItem]
