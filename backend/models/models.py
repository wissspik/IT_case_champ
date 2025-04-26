from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy import  text, Integer, String,  LargeBinary,Float,Index
from backend.models.support_models import JSONText

class Base(DeclarativeBase):
    pass
class servis_fitbacks(Base):
    __tablename__ = 'servis_fitbacks'
    id:         Mapped[int] = mapped_column(Integer,primary_key=True)
    score:      Mapped[int] = mapped_column(Integer,nullable=True)
    comments:   Mapped[str] = mapped_column(String(250),nullable=True)

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
    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    bank: Mapped[str] = mapped_column(String(50), nullable=False)
    country: Mapped[str] = mapped_column(String(50), nullable=False)
    method: Mapped[str] = mapped_column(String(50), nullable=False)
    currency: Mapped[str] = mapped_column(String(50), nullable=False)
    commision: Mapped[float] = mapped_column(Float)
    limit_min: Mapped[float] = mapped_column(Float)
    limit_max: Mapped[int] = mapped_column(Integer)
    comments: Mapped[str] = mapped_column(String(150), nullable=True)

'''
class transfer_methods(Base):
    __tablename__ = 'transfer_methods'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    cash: Mapped[bool] = mapped_column(Boolean)
    bank_card: Mapped[bool] = mapped_column(Boolean)
    account_number: Mapped[bool] = mapped_column(Boolean)
    full_name: Mapped[bool] = mapped_column(Boolean)

    country_id: Mapped[int] = mapped_column(Integer, ForeignKey('countries_bank.id'))

    countries = relationship('Currencies', backref='methods')
class currencies(Base):
    __tablename__ = 'currencies'
    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    name : Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    methods_id: Mapped[int] = mapped_column(Integer, ForeignKey('transfer_methods.id'))

'''
#bank -> countries_many -> transfer_methods -> Currencies ->
