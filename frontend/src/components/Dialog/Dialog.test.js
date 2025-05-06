// Dialog.test.js
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Dialog from './Dialog';

// Мокаем axios
jest.mock('axios');

describe('Dialog Component', () => {
    const mockYourMessage = 'Test message';

    beforeEach(() => {
        // Очищаем все моки перед каждым тестом
        jest.clearAllMocks();
    });

    test('renders initial messages correctly', () => {
        render(<Dialog yourmessage={mockYourMessage}/>);

        // Проверяем что пользовательское сообщение отобразилось
        expect(screen.getByText(mockYourMessage)).toBeInTheDocument();

        // Проверяем что бот ответил с кнопками
        expect(screen.getByText(/Привет, с чем конкретно тебе помочь/i)).toBeInTheDocument();
        expect(screen.getByText('💸 Комиссия')).toBeInTheDocument();
        expect(screen.getByText('💱 Обмен валюты')).toBeInTheDocument();
        expect(screen.getByText('🏦 Вклады и счета')).toBeInTheDocument();
    });

    test('handles commission button click', () => {
        render(<Dialog yourmessage={mockYourMessage}/>);

        // Нажимаем кнопку "Комиссия"
        fireEvent.click(screen.getByText('💸 Комиссия'));

        // Проверяем что появилось сообщение о выборе валюты
        expect(screen.getByText(/Выбери валюту/i)).toBeInTheDocument();
    });

    test('handles currency exchange button click', () => {
        render(<Dialog yourmessage={mockYourMessage}/>);

        // Нажимаем кнопку "Обмен валюты"
        fireEvent.click(screen.getByText('💱 Обмен валюты'));

        // Проверяем что отобразился компонент TradeCurrency
        expect(screen.getByTestId('trade-currency')).toBeInTheDocument();
    });

    test('handles deposits button click', () => {
        render(<Dialog yourmessage={mockYourMessage}/>);

        // Нажимаем кнопку "Вклады и счета"
        fireEvent.click(screen.getByText('🏦 Вклады и счета'));

        // Проверяем что появился вопрос о выборе
        expect(screen.getByText(/Что тебя интересует/i)).toBeInTheDocument();
        expect(screen.getByText('💎 Накопительный счет')).toBeInTheDocument();
        expect(screen.getByText('📠 Вклады')).toBeInTheDocument();
    });

    describe('Commission calculation flow', () => {
        test('selects currency and country', async () => {
            render(<Dialog yourmessage={mockYourMessage}/>);

            // Начинаем процесс расчета комиссии
            fireEvent.click(screen.getByText('💸 Комиссия'));

            // Выбираем валюту (имитируем выбор из компонента Export)
            fireEvent.click(screen.getByText('Российский рубль'));

            // Проверяем что запросили страну
            expect(screen.getByText(/Выбери страну/i)).toBeInTheDocument();

            // Выбираем страну
            fireEvent.click(screen.getByText('Россия')); // Предполагая, что такая страна есть в списке

            // Проверяем что запросили сумму
            expect(screen.getByText(/Напиши сумму/i)).toBeInTheDocument();
        });

        test('handles valid amount input', async () => {
            render(<Dialog yourmessage={mockYourMessage}/>);

            // Имитируем весь процесс до ввода суммы
            fireEvent.click(screen.getByText('💸 Комиссия'));
            fireEvent.click(screen.getByText('Российский рубль'));
            fireEvent.click(screen.getByText('Россия'));

            // Вводим валидную сумму
            const input = screen.getByRole('textbox');
            fireEvent.change(input, {target: {value: '1000'}});
            fireEvent.submit(input);

            // Проверяем что появился выбор метода перевода
            await waitFor(() => {
                expect(screen.getByText(/Выбери метод для перевода/i)).toBeInTheDocument();
            });
        });

        test('handles invalid amount input', async () => {
            render(<Dialog yourmessage={mockYourMessage}/>);

            // Имитируем весь процесс до ввода суммы
            fireEvent.click(screen.getByText('💸 Комиссия'));
            fireEvent.click(screen.getByText('Российский рубль'));
            fireEvent.click(screen.getByText('Россия'));

            // Вводим невалидную сумму
            const input = screen.getByRole('textbox');
            fireEvent.change(input, {target: {value: 'invalid'}});
            fireEvent.submit(input);

            // Проверяем сообщение об ошибке
            await waitFor(() => {
                expect(screen.getByText(/Ты ввел неверное число/i)).toBeInTheDocument();
            });
        });

        test('completes commission calculation', async () => {
            // Мокаем успешный ответ от API
            const mockResponse = {
                data: {
                    commission: 50,
                    total: 1050,
                    exchange_rate: 1.0
                }
            };
            axios.post.mockResolvedValue(mockResponse);

            render(<Dialog yourmessage={mockYourMessage}/>);

            // Имитируем весь процесс до подтверждения перевода
            fireEvent.click(screen.getByText('💸 Комиссия'));
            fireEvent.click(screen.getByText('Российский рубль'));
            fireEvent.click(screen.getByText('Россия'));

            const input = screen.getByRole('textbox');
            fireEvent.change(input, {target: {value: '1000'}});
            fireEvent.submit(input);

            // Выбираем метод перевода
            await waitFor(() => {
                fireEvent.click(screen.getByText('KoronPay'));
            });

            // Подтверждаем перевод
            fireEvent.click(screen.getByText('Все верно'));

            // Проверяем что отправился запрос и отобразилась таблица с результатами
            await waitFor(() => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(screen.getByTestId('commission-table')).toBeInTheDocument();
            });
        });
    });

    describe('Deposit selection flow', () => {
        test('navigates through deposit selection', async () => {
            render(<Dialog yourmessage={mockYourMessage}/>);

            // Начинаем процесс выбора вклада
            fireEvent.click(screen.getByText('🏦 Вклады и счета'));
            fireEvent.click(screen.getByText('📠 Вклады'));
            fireEvent.click(screen.getByText('🎯 Помочь выбрать вклад'));

            // Выбираем валюту
            fireEvent.click(screen.getByText('Рубли'));

            // Выбираем срок
            fireEvent.click(screen.getByText('1 - 3 мес'));

            // Выбираем способ получения процентов
            fireEvent.click(screen.getByText('Ежемесячно на счет / карту'));

            // Выбираем условие для надбавки
            fireEvent.click(screen.getByText('1'));

            // Проверяем что получили рекомендацию
            await waitFor(() => {
                expect(screen.getByText(/Тебе подходят такие вклады как/i)).toBeInTheDocument();
            });
        });
    });

    test('clears messages correctly', () => {
        render(<Dialog yourmessage={mockYourMessage}/>);

        // Находим и нажимаем кнопку очистки (предполагая, что она есть в Smska)
        const clearButton = screen.getByLabelText('Очистить');
        fireEvent.click(clearButton);

        // Проверяем что появилось прощальное сообщение
        expect(screen.getByText(/Пока, если нужна будет помощь/i)).toBeInTheDocument();
    });
});