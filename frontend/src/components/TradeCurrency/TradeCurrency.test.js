import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import TradeCurrency from './TradeCurrency';
import axios from 'axios';

jest.mock('axios');

describe('TradeCurrency Component', () => {
    beforeEach(() => {
        axios.post.mockReset();
    });

    test('renders currency converter UI elements', () => {
        render(<TradeCurrency/>);
        expect(screen.getByText('Конвертер валют')).toBeInTheDocument();
        expect(screen.getByLabelText('У меня есть')).toBeInTheDocument();
        expect(screen.getByLabelText('Мне нужно')).toBeInTheDocument();
    });

    test('disables buttons when loading', async () => {
        axios.post.mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({data: {amount: 100}}), 100))
        );

        render(<TradeCurrency/>);
        const input = screen.getByLabelText('У меня есть');
        fireEvent.change(input, {target: {value: '10'}});

        await waitFor(() => expect(screen.getByText('Загрузка...')).toBeInTheDocument());
    });

    test('shows error when API call fails', async () => {
        axios.post.mockRejectedValue(new Error('Network Error'));

        render(<TradeCurrency/>);
        const input = screen.getByLabelText('У меня есть');
        fireEvent.change(input, {target: {value: '10'}});

        await waitFor(() => {
            expect(screen.getByText('Ошибка при получении курса обмена')).toBeInTheDocument();
        });
    });

    test('performs currency swap correctly', async () => {
        axios.post.mockResolvedValue({data: {amount: 200}});

        render(<TradeCurrency/>);
        const input = screen.getByLabelText('У меня есть');
        fireEvent.change(input, {target: {value: '100'}});

        const swapButton = screen.getByRole('button', {name: ''}); // svg button
        fireEvent.click(swapButton);

        await waitFor(() => {
            expect(screen.getByText(/1 EUR ≈/)).toBeInTheDocument();
        });
    });

    test('displays exchange rate after valid input', async () => {
        axios.post.mockResolvedValue({data: {amount: 200}});

        render(<TradeCurrency/>);
        const input = screen.getByLabelText('У меня есть');
        fireEvent.change(input, {target: {value: '100'}});

        await waitFor(() => {
            expect(screen.getByDisplayValue('200.00')).toBeInTheDocument();
            expect(screen.getByText(/1 RUB ≈ 2.000000 EUR/)).toBeInTheDocument();
        });
    });

    test('clears values on empty input', () => {
        render(<TradeCurrency/>);
        const input = screen.getByLabelText('У меня есть');
        fireEvent.change(input, {target: {value: ''}});

        expect(input.value).toBe('');
    });
});
