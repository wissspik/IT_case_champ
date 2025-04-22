from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase,declarative_base, relationship
from sqlalchemy import String, LargeBinary, text, Integer, String, ForeignKey, LargeBinary,JSON
from typing import List
import json
from sqlalchemy.types import TypeDecorator, TEXT
class JSONText(TypeDecorator):
    impl = TEXT

    def process_bind_param(self, value, dialect):
        # Сериализуем в JSON с ensure_ascii=False, чтобы не эскейпить кириллицу
        return json.dumps(value, ensure_ascii=False)

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        return json.loads(value)

class Base(DeclarativeBase):
    pass
#
class exchange_rates_mobile_app(Base):
    __tablename__ = 'exchange_rates_mobile_app'
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int]
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_internet_bank(Base):
    __tablename__ = 'exchange_rates_internet_bank'
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int]
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_office_cash(Base):
    __tablename__ = 'exchange_rates_office_cash'
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int]
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_office_cashless(Base):
    __tablename__ = 'exchange_rates_office_cashless'
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int]
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_cards(Base):
    __tablename__ = 'exchange_rates_cards'
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int]
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]

class exchange_rates_office_cashless_premium(Base):
    __tablename__ = 'exchange_rates_office_cashless_premium'
    id: Mapped[int] = mapped_column(primary_key=True)
    quantity: Mapped[int]
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]

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


