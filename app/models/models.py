from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase,declarative_base, relationship

from sqlalchemy import Integer, String, ForeignKey

class Base(DeclarativeBase):
    pass
# 1)'exchange_rates_mobile_app' 2)'exchange_rates_internet_bank' 3)'exchange_rates_office_cash' 4)exchange_rates_office_cashless 5)exchange_rates_cards
class exchange_rates_mobile_app(Base):
    __tablename__ = 'exchange_rates_mobile_app'
    id: Mapped[int] = mapped_column(primary_key=True)
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_internet_bank(Base):
    __tablename__ = 'exchange_rates_internet_bank'
    id: Mapped[int] = mapped_column(primary_key=True)
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_office_cash(Base):
    __tablename__ = 'exchange_rates_office_cash'
    id: Mapped[int] = mapped_column(primary_key=True)
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_office_cashless(Base):
    __tablename__ = 'exchange_rates_office_cashless'
    id: Mapped[int] = mapped_column(primary_key=True)
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
class exchange_rates_cards(Base):
    __tablename__ = 'exchange_rates_cards'
    id: Mapped[int] = mapped_column(primary_key=True)
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]



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