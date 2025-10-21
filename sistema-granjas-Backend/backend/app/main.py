from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api import granjas

app = FastAPI()

# 👇 Añade esto para permitir el acceso desde el frontend
origins = [
    "http://localhost:5173",  # tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(granjas.router, prefix="/api/granjas", tags=["Granjas"])

@app.get("/")
def root():
    return {"message": "API funcionando correctamente 🚀"}


@app.post("/api/sync")
async def sync_data(request: Request):
    data = await request.json()
    print("📥 Datos recibidos desde frontend:", data)
    # Aquí podrías guardarlos en BD más adelante
    return {"message": "Datos sincronizados correctamente"}
