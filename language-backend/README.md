# Backend

## Setup

```
pip install -r requirements.txt
```

```
python app.pyy
```

URL is `localhost:8080` or `127.0.0.1:8080`

## API Routes

### Word to sentence

```
curl -XPOST localhost:8080/api/word_to_sentence -d "{\"message\": \"casa\"}" -H "Content-Type: application/json"
```

Response:

```
{
  "data": "La casa es muy bonita. (The house is very beautiful.)"
}
```

### Sentence to image

```
curl -XPOST localhost:8080/api/sentence_to_image -d "{\"message\": \"mi casa es tu casa\"}" -H "Content-Type: application/json"
```

Response:

```
{
  "data": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-dqLUEDrMw0A2DtY4YxgXFBDn/user-q6vCipxIuFmQVunOX5YMfEt2/img-qzXLPWvAMFvsttAyKv3NjSAt.png?st=2023-07-15T21%3A34%3A24Z&se=2023-07-15T23%3A34%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-15T20%3A37%3A48Z&ske=2023-07-16T20%3A37%3A48Z&sks=b&skv=2021-08-06&sig=4AN0ZW/OFjkrL1P6hAjrkAstUXt9QvqNmPfY%2BgG9UBI%3D"
}
```
