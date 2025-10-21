from pydantic import BaseModel
from typing import Optional

class GranjaBase(BaseModel):
    nombre: str
    ubicacion: str
    asesor_id: Optional[int] = None
    programa_id: Optional[int] = None

class GranjaCreate(GranjaBase):
    pass

class GranjaResponse(GranjaBase):
    id: int

    class Config:
        from_attributes = True
