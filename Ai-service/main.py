from fastapi import FastAPI
from services.roadmap import generate_roadmap


app = FastAPI()

@app.post("/generate-roadmap")
def roadmap(data: dict):
    topic = data["topic"]
    duration = data["duration"]
    level = data["level"]

    result = generate_roadmap(topic, duration, level)
    return result