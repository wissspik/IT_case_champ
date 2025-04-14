from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase,declarative_base, relationship

from sqlalchemy import Integer, String, ForeignKey

class Base(DeclarativeBase):
    pass

class point_countris(Base):
    __tablename__ = 'point_countries'
    id: Mapped[int] = mapped_column(primary_key=True)
    currency: Mapped[str]
    buy:Mapped[float]
    sell:Mapped[float]
    hh: Mapped[float]


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