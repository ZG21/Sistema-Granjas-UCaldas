from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    rol = Column(String(50), nullable=False)
    granjas = relationship("Granja", back_populates="asesor")
    labores = relationship("Labor", back_populates="usuario")

class Programa(Base):
    __tablename__ = "programas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    granjas = relationship("Granja", back_populates="programa")

class Granja(Base):
    __tablename__ = "granjas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    ubicacion = Column(String(150), nullable=False)
    asesor_id = Column(Integer, ForeignKey("usuarios.id"))
    programa_id = Column(Integer, ForeignKey("programas.id"))
    asesor = relationship("Usuario", back_populates="granjas")
    programa = relationship("Programa", back_populates="granjas")
    lotes = relationship("Lote", back_populates="granja")

class Lote(Base):
    __tablename__ = "lotes"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    cultivo = Column(String(100))
    area = Column(Float)
    estado = Column(String(50))
    granja_id = Column(Integer, ForeignKey("granjas.id"))
    granja = relationship("Granja", back_populates="lotes")
    labores = relationship("Labor", back_populates="lote")

class Labor(Base):
    __tablename__ = "labores"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    estado = Column(String(50), default="pendiente")
    fecha_inicio = Column(DateTime, default=datetime.utcnow)
    fecha_fin = Column(DateTime, nullable=True)
    lote_id = Column(Integer, ForeignKey("lotes.id"))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    lote = relationship("Lote", back_populates="labores")
    usuario = relationship("Usuario", back_populates="labores")
