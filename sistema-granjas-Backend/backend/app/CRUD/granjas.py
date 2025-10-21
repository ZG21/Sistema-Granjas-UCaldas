from sqlalchemy.orm import Session
from app.db import models
from app.schemas.granja_schema import GranjaCreate

def get_granjas(db: Session):
    return db.query(models.Granja).all()

def create_granja(db: Session, granja: GranjaCreate):
    db_granja = models.Granja(
        nombre=granja.nombre,
        ubicacion=granja.ubicacion,
        asesor_id=granja.asesor_id,
        programa_id=granja.programa_id
    )
    db.add(db_granja)
    db.commit()
    db.refresh(db_granja)
    return db_granja
