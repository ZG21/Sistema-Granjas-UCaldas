from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.granja_schema import GranjaCreate, GranjaResponse
from app.CRUD import granjas as crud_granja
from app.db.database import get_db

router = APIRouter(prefix="/granjas", tags=["Granjas"])

@router.get("/", response_model=List[GranjaResponse])
def listar_granjas(db: Session = Depends(get_db)):
    return crud_granja.get_granjas(db)

@router.post("/", response_model=GranjaResponse)
def crear_granja(granja: GranjaCreate, db: Session = Depends(get_db)):
    return crud_granja.create_granja(db, granja)
