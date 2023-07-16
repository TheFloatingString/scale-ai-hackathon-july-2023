from flask import Flask, request
import requests
import os
import openai
from dotenv import load_dotenv
from pymongo import MongoClient

from flask_cors import CORS

from flask_cors import CORS, cross_origin

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY_SAI")

mongo_client = MongoClient("mongodb+srv://user:pass@cluster0.gtjf1ql.mongodb.net/?retryWrites=true&w=majority")

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

@app.route("/")
# @cross_origin
def root():
    return {"data": "Flash REST API"}

@app.route("/api/db/item", methods=["GET", "POST"])
def api_db_item():

    post = {
            "frontWord": "casa",
            "frontSentence": "Mi casa es tu casa.",
            "frontImage": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-dqLUEDrMw0A2DtY4YxgXFBDn/user-q6vCipxIuFmQVunOX5YMfEt2/img-rO4FT7AtnqNoIjv8HnskcDc6.png?st=2023-07-15T22%3A57%3A04Z&se=2023-07-16T00%3A57%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-15T20%3A39%3A55Z&ske=2023-07-16T20%3A39%3A55Z&sks=b&skv=2021-08-06&sig=J6Ky8dZzWe1YyflWv/vVG14mObrv/%2B0TW3qKjh5YvcE%3D",
            "backWord": "house",
            "backSentence": "My house is your house."
            }
            
    post_id = mongo_client.db.coll.insert_one(post).inserted_id

    return {"data": "Posted"}

@app.route("/api/db/results", methods=["GET", "POST"])
def api_db_results():
    return_list = []

    curr_coll = mongo_client.db.coll

    for post in curr_coll.find():
        post.pop("_id")
        return_list.append(post)

    print(return_list)

    return {"data": return_list}

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
