import { render, screen } from '@testing-library/react';
import TradeCurrency from "./components/TradeCurrency";

test('renders learn react link', () => {
  render(<TradeCurrency/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
