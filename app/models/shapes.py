from tkinter import BooleanVar

from pydantic import BaseModel
from typing_extensions import Literal


class Application(BaseModel):
    amount: int
    bank_in : str
    bank_out: str

