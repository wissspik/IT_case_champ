from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase,declarative_base, relationship
from sqlalchemy import  text, Integer, String, ForeignKey, LargeBinary,JSON,Float,Enum,Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from backend.models.support_models import JSONText
class Base(DeclarativeBase):
    pass

class Base(DeclarativeBase):
    pass
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

class servis_fitbacks(Base):
    __tablename__ = 'servis_fitbacks'
    id:         Mapped[int] = mapped_column(Integer,primary_key=True)
    score:      Mapped[int] = mapped_column(Integer,nullable=True)
    category:   Mapped[str] = mapped_column(String(255),nullable=True,index=True,unique=True)
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


'''
class Banks(Base):
    __tablename__ = 'Banks'

    id: Mapped[int] = mapped_column(Integer,primary_key=True)
    name: Mapped[str] = mapped_column(String(50),index=True,unique=True,nullable=False)
    website : Mapped[str] = mapped_column(String(50),unique=True,nullable=False)

class Countries(Base):
    __tablename__ = 'Countries'

    id: Mapped[int] = mapped_column(primary_key=True)
    country: Mapped[str] = mapped_column(String(30),index=True,nullable=False)

class TransferMethods(Base):
    __tablename__ = 'TransferMethods'

    id: Mapped[int] = mapped_column(primary_key=True)
    cash:Mapped[bool] = mapped_column(nullable=False)
    telephone:Mapped[bool] = mapped_column(nullable=False)
    bank_carts:Mapped[bool] = mapped_column(nullable=False)
    account_number:Mapped[bool] = mapped_column(nullable=False)
class Currencies(Base):
    __tablename__ = 'Currencies'
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(30),index=True,nullable=False)

class Commission(Base):
    __tablename__ = 'Commission'

    id: Mapped[int] = mapped_column(primary_key=True)
'''


