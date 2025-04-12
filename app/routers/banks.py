from  fastapi import APIRouter
import requests
from bs4 import BeautifulSoup

app = APIRouter(tags=['banks'])
# ручка ,которая отдает список государств
@app.post("/take_countries")
async def take_countries():
    url = "https://ru.wikipedia.org/wiki/Список_государств"
    response = requests.get(url)
    response.encoding = 'utf-8'
    table = BeautifulSoup(response.text, "html.parser").find("table", class_="wikitable")
    if not table:
        return []
    # Из каждой строки (кроме заголовка) извлекаем третью ячейку, если её достаточно
    return [
        row.find_all("td")[2].get_text(strip=True)
        for row in table.find_all("tr")[1:]
        if len(row.find_all("td")) > 2
    ]
