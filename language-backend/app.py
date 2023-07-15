from flask import Flask, request
import requests
import os

app = Flask(__name__)

@app.route("/")
def root():
    return {"data": "Flash REST API"}

@app.route("/api/word_to_sentence", methods=["GET", "POST"])
def api_word_to_sentence():
    data = request.json
    print(data["message"])
    return {"data": "word_to_sentence"}

@app.route("/api/sentence_to_image", methods=["GET", "POST"])
def api_sentence_to_image():
    data = request.json
    print(data["message"])
    return {"data": "sentence_to_image"}

if __name__ == "__main__":
    app.run(port=8080, host="0.0.0.0", debug=True)
