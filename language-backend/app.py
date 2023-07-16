from flask import Flask, request
import requests
import os
import openai
from dotenv import load_dotenv

from flask_cors import CORS, cross_origin

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY_SAI")

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#     return response

@app.route("/")
# @cross_origin
def root():
    return {"data": "Flash REST API"}

@app.route("/api/word_to_sentence", methods=["GET", "POST"])
# @cross_origin
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

    return {"data": RESULT["content"]}

@app.route("/api/sentence_to_image", methods=["GET", "POST"])
# @cross_origin
def api_sentence_to_image():
    data = request.json

    completion = openai.Image.create(
        prompt=data["message"],
        n=2,
        size="512x512"
    )

    print(completion)

    return {"data": completion["data"][0]["url"]}

if __name__ == "__main__":
    app.run(port=8080, host="0.0.0.0", debug=True)
