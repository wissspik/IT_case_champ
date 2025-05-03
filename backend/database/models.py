from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy import Integer, String,Float,Index
from sqlalchemy.dialects.postgresql import UUID
from decimal import Decimal
from sqlalchemy import Numeric
import uuid

class Base(AsyncAttrs,DeclarativeBase):
    pass
class ServisFitbacks(Base):
    __tablename__ = 'servis_fitbacks'
    id:         Mapped[int] = mapped_column(Integer,primary_key=True)
    score:      Mapped[int] = mapped_column(Integer,nullable=True)
    comments:   Mapped[str] = mapped_column(String(250),nullable=True)

class ExchangeMethodsAll(Base):
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

class Countries(Base):
    __tablename__ = 'countries'
    id: Mapped[int] = mapped_column(primary_key=True)
    country:Mapped[str] = mapped_column(String,index = True,unique= True)
    picture: Mapped[str] = mapped_column(String,index = True,unique= True)

#Банковская система таблиц
class BankSistem(Base):
    __tablename__ = 'bank_sistem'
    __table_args__ = (
        Index(
            "ix_bs_bank_country_method_curr",  # имя индекса в БД
            "bank",
            "country",
            "method",
            "currency",

        ),
    )
    id : Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),        # тип столбца в БД
        primary_key=True,          # первичный ключ
        default=uuid.uuid4         # автоматически генерировать новый UUID
    )
    bank: Mapped[str] = mapped_column(String(50), nullable=False)
    country: Mapped[str] = mapped_column(String(50), nullable=False)
    method: Mapped[str] = mapped_column(String(50), nullable=False)
    currency: Mapped[str] = mapped_column(String(50), nullable=False)
    commission: Mapped[Decimal] = mapped_column(
        Numeric(precision=6, scale=2),
        default=Decimal("0.00"),
    )
    limit_min: Mapped[Decimal] = mapped_column(Numeric(6, 2),
        default=Decimal("0.00"),
    )
    limit_max: Mapped[Decimal] = mapped_column(Numeric(6, 2),nullable=False,
            default=Decimal("0.00"),
    )
    comments: Mapped[str] = mapped_column(String(150), nullable=True)

