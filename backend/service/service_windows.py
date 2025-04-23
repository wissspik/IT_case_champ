from fastapi import APIRouter,HTTPException
from unicodedata import category

from backend.models.shapes import fitback_chat,delivery_question
from backend.database.base import SessionDep
from backend.models.models import servis_fitbacks
from sqlalchemy import select

app = APIRouter(tags=['service'])


# ручка,которая добавляет оценку работы бота в таблицу
@app.put("/takes_fitback")
async def takes_fitback(data:fitback_chat,session : SessionDep):
    if data.message:
        session.add(servis_fitbacks(score=data.score,message=data.message))
    else:
        session.add(servis_fitbacks(score=data.score))
    await session.commit()
    return {'message':'ok'}
'''
ручка для добавлений данных для ответов.
'''


@app.post("/delivery_question")
async def delivery_question(data : delivery_question, session : SessionDep):
    corw = data.category
    stmt = select(servis_fitbacks).where(servis_fitbacks.category == corw)
    result = await session.execute(stmt)
    item = result.scalar_one_or_none()  # !!! вытаскиваем модель или None
    if item is None:
        raise HTTPException(status_code=404, detail="Запись не найдена")
    return {
        "question": item.question,
        "answer": item.answer
    }
@app.post("/gives_baners")
async def gives_baners(session : SessionDep):
    url_picture = ['https://cdn.gpb.ru/upload/files/bve/2c2/amtv44agojowa3eubap1npeqxnq3ggke/x1_Head-banner-Desktop-960x1120px.png',
                   'https://cdn.gpb.ru/upload/files/bve/699/a094p509kwihmwyq2c09lt6qmf7fuh1k/x1_Head-banner-Desktop-960x1120px.png',
                   'https://cdn.gpb.ru/upload/files/bve/df6/9orh0nxl6exk1c9ndf100xqed4oetkjs/x1_Head-banner-Desktop-_-PDS-_-960x1120px.png',
                   'https://cdn.gpb.ru/upload/files/bve/911/f951dz6nfpw8bztxuojcl35rqd2vkbw7/x1_Head-banner-Desktop-960x1120px.png',
                   'https://cdn.gpb.ru/upload/files/bve/173/exuq6hvwwpgot1boknxp8i1gc1kc3pvs/x1_Head-banner-Desktop-960x1120px.png',
                   'https://cdn.gpb.ru/upload/files/bve/4bb/sqguii0x9ybhc7a4tp0dptfzvb00x55z/x1_Head-banner-Desktop-960x1120px.png',]
    id_arr = ["BigBenefits","Cashback","LongSavings","PremiumCard","LowPayment","PreciousMetals"]
    category_arr = ["Сбережения","Карты","Сбережения","Премиум","Кредиты","Инвестиции"]
    title_arr = ["21% годовых по вкладу «Большая выгода»","Кэшбэк на самое важное","Программа долгосрочных сбережений","Лучшая премиальная карта","Большой кредит с низким платежом","Драгоценные металлы"]
    subtitle_arr = ["Фиксированная ставка на 367 дней","По дебетовой карте","До 64% выгоды к личным взносам по программе","с выгодой от 500 000 ₽ в год","Выгоднее с залогом недвижимости","Покупка и продажа золотых слитков"]
    background_color = ['#476BF0','#DDF1FF','#FFD7C4','#4D2331','#A8DCFF','#3356D7']
    textColor_arr = ["#FFFFFF","#000000","#000000","FFFFFF","#000000","#FFFFFF"]
    linkUrl_arr = ["https://www.gazprombank.ru/personal/increase/deposits/detail/7567855/","https://www.gazprombank.ru/personal/cards/7579039/","https://www.gazprombank.ru/personal/page/pds/","https://www.gazprombank.ru/premium/","https://www.gazprombank.ru/personal/take_credit/mortgage/42168/","https://www.gazprombank.ru/personal/page/metal/"]
    result =  []
    for i in range(len(url_picture)):
        j_s = {"id":id_arr[i],
             "category":category_arr[i],
             "title": title_arr[i],
             "subtitle": subtitle_arr[i],
             "backgroundColor": background_color[i],
             "textColor": textColor_arr[i],
             "imageUrl": url_picture[i],
             "linkUrl": linkUrl_arr[i]
        }
        result.append(j_s)
    return result

