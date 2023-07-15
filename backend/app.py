from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"data": "Rest API for Link."}

if __name__ == "__main__":
    uvicorn.run(app)
