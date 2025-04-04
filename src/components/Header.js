import React from "react";
function Header() {
    return (
        <div className={'Header'}>
            <a href="https://www.gazprombank.ru/"><img src="/img/gaziz.png" alt="" width={'290'} height={'61'}/></a>
            <nav className={'nav-menu'}>
                <span>Обмен валют</span>
                <span>Привилегии</span>
                <span>Инвестиции</span>
                <span>Вклады и счета</span>
                <span>Карты</span>

            </nav>


        </div>


    );
}

export default Header;