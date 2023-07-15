from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"data": "Rest API for Link."}

@app.post("/api/problem")
async def api_problem(request: Request):
    print(await request.json())
    return {"data": "Problem submitted."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
