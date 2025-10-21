from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Modelo de datos que recibimos desde IndexedDB
class SyncItem(BaseModel):
    tipo: str
    data: dict
    synced: bool | None = None
    createdAt: str | None = None

@router.post("/sync")
async def sync_data(item: SyncItem):
    print(f"📥 Recibido desde frontend: {item}")
    # Aquí en el futuro guardarás en la base de datos
    return {"status": "ok", "received": item}
