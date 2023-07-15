from flask import Flask, request
import requests
import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY_SAI")

app = Flask(__name__)

@app.route("/")
def root():
    return {"data": "Flash REST API"}

@app.route("/api/word_to_sentence", methods=["GET", "POST"])
def api_word_to_sentence():
    data = request.json
    PROMPT = f"Generate a sentence using the phrase {data['message']} in the same language as this phrase"
    print(PROMPT)
    print(data["message"])

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": PROMPT}
        ]
    )



    RESULT = completion.choices[0].message

    return {"data": RESULT}

@app.route("/api/sentence_to_image", methods=["GET", "POST"])
def api_sentence_to_image():
    data = request.json
    print(data["message"])
    return {"data": "sentence_to_image"}

if __name__ == "__main__":
    app.run(port=8080, host="0.0.0.0", debug=True)
