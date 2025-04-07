from pydantic import BaseModel
from typing_extensions import Literal

class hello_message(BaseModel):
    message: str


class Application(BaseModel):
    amount: int
    bank_in : str
    bank_out: str

