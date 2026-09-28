from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import health, memory, rfq, suppliers

app = FastAPI(
    title="BATCHWISE API",
    description="Experience-Driven Supplier Sourcing Agent with Hindsight Persistent Memory",
    version="2.0.0"
)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(health.router)
app.include_router(memory.router)
app.include_router(rfq.router)
app.include_router(suppliers.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
