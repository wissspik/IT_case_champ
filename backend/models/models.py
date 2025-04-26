from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy import  text, Integer, String,  LargeBinary,Float,Index,ForeignKey,Boolean
from sqlalchemy.orm import relationship
from typing import List
from backend.models.support_models import JSONText

class Base(DeclarativeBase):
    pass
class servis_fitbacks(Base):
    __tablename__ = 'servis_fitbacks'
    id:         Mapped[int] = mapped_column(Integer,primary_key=True)
    score:      Mapped[int] = mapped_column(Integer,nullable=True)
    category:   Mapped[str] =        mapped_column(String(255),nullable=True,index=True,unique=True)
    question:   Mapped[list[str]] = mapped_column(
        JSONText,
        nullable=True,
        server_default="[]"
    )
    answer:     Mapped[list[str]] = mapped_column(
    JSONText,
        nullable=True,
        server_default="[]"
    )
    message: Mapped[str] = mapped_column(String,nullable=True,index=False)

class exchange_methods_all(Base):
    __tablename__ = 'exchange_methods_all'
    __table_args__ = (
        Index(
            "ix_exchange_rates_currency_category",  # имя индекса в БД
            "currency",
            "category"
        ),
    )
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    currency: Mapped[str] = mapped_column(String(100),index = True)
    category: Mapped[str] = mapped_column(String(100),index = True)
    buy: Mapped[float] = mapped_column(Float)
    sell: Mapped[float] = mapped_column(Float)
    quantity: Mapped[int] = mapped_column(Integer)

class countries(Base):
    __tablename__ = 'countries'
    id: Mapped[int] = mapped_column(primary_key=True)
    country:Mapped[str] = mapped_column(String,index = True,unique= True)
    picture: Mapped[bytes] = mapped_column(LargeBinary,nullable=False, server_default=text("X''"))


#Банковская система ботом
class Banks(Base):
    __tablename__ = 'banks'
    id:        Mapped[int]    = mapped_column(Integer, primary_key=True)
    bank:      Mapped[str]    = mapped_column(String(50), unique=True, nullable=False, index=True)
    website:   Mapped[str]    = mapped_column(String(100), unique=True, nullable=False)

    countries = relationship("countries_bank",back_populates="bank",cascade="all, delete-orphan")


class countries_bank(Base):
    __tablename__ = 'countries_bank'
    id:      Mapped[int] = mapped_column(Integer, primary_key=True)
    country:    Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    bank_id: Mapped[int] = mapped_column(Integer, ForeignKey('banks.id'))

    parent = relationship(
        "Parent",
        back_populates="children"
    )
    countries = relationship('Transfer_methods', backref='county')
class Transfer_methods(Base):
    __tablename__ = 'transfer_methods'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    cash: Mapped[bool] = mapped_column(Boolean)
    bank_card: Mapped[bool] = mapped_column(Boolean)
    account_number: Mapped[bool] = mapped_column(Boolean)
    full_name: Mapped[bool] = mapped_column(Boolean)

    country_id: Mapped[int] = mapped_column(Integer, ForeignKey('countries_bank.id'))

    countries = relationship('Currencies', backref='methods')
class Currencies(Base):
    __tablename__ = 'currencies'
    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    name : Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    methods_id: Mapped[int] = mapped_column(Integer, ForeignKey('transfer_methods.id'))


#bank -> countries_many -> transfer_methods -> Currencies ->
'''

1)все страны распиши 
2)все валюты

'''