# backend

### Install dependencies

```
pip install -r requirements.txt
```

### Run web app

```
python app.py
```

### API requests

Root API endpoint

```
curl -XGET localhost:8000
```

User post problem

```
curl -XPOST localhost:8000/api/problem -H "application/json" -D "<JSON string>"
