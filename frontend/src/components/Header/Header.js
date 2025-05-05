import './Header.css'
import React from "react";
export default function Header() {
    return (
        <div className={'Header'}>
            <a href="https://www.gazprombank.ru/"><img className={'img-gazprom'} src="/img/gaziz.png" alt="" /></a>
            <nav className={'nav-menu'}>
                <div className={'a'}>
                    <a href={'https://www.gazprombank.ru/personal/courses/'}>Обмен валют</a>
                    <a href={'https://www.gazprombank.ru/personal/privileges/'}>Привилегии</a>
                    <a href={'https://www.gazprombank.ru/personal/page/individual-investment-account-main/'}>Инвестиции</a>
                    <a href={'https://www.gazprombank.ru/personal/increase/deposits/'}>Вклады и счета</a>
                    <a href={'https://www.gazprombank.ru/personal/cards/'}>Карты</a>
                </div>
            </nav>
        </div>


    );
}

