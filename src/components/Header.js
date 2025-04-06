import React from "react";
function Header() {
    return (
        <div className={'Header'}>
            <a href="https://www.gazprombank.ru/"><img src="/img/gaziz.png" alt="" width={'290'} height={'61'}/></a>
            <nav className={'nav-menu'}>
                <div className={'a'}>
                    <a href={'https://www.gazprombank.ru/personal/courses/'}>Обмен валют</a>
                    <a href={'https://www.gazprombank.ru/personal/privileges/'}>Привилегии</a>
                    <a href={'https://www.gazprombank.ru/personal/courses/'}>Инвестиции</a>
                    <a href={'https://www.gazprombank.ru/personal/courses/'}>Вклады и счета</a>
                    <a href={'https://www.gazprombank.ru/personal/courses/'}>Карты</a>

                </div>


            </nav>


        </div>


    );
}

export default Header;