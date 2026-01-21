import openai
import json

def generate_roadmap(topic, duration, level):
    with open("prompts/roadmap.txt") as f:
        prompt = f.read()

    prompt = prompt.format(
        topic=topic,
        duration=duration,
        level=level
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    text = response["choices"][0]["message"]["content"]
    return json.loads(text)
