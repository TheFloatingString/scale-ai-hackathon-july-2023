from flask import Flask, request
import requests
import os
import openai
from dotenv import load_dotenv
from pymongo import MongoClient

from flask_cors import CORS

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY_SAI")

mongo_client = MongoClient("mongodb+srv://user:pass@cluster0.gtjf1ql.mongodb.net/?retryWrites=true&w=majority")

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def root():
    return {"data": "Flash REST API"}

@app.route("/api/db/item", methods=["GET", "POST"])
def api_db_item():

    post = {"data": "content"}

    post_id = mongo_client.db.coll.insert_one(post).inserted_id

    return {"data": "1"}

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

    return {"data": RESULT["content"]}

@app.route("/api/sentence_to_image", methods=["GET", "POST"])
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
