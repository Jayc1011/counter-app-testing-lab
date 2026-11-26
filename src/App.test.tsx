import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App counter white-box tests', () => {
  test('renders initial count of 0 and all action buttons', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /count:\s*0/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('increments count on single and multiple clicks', async () => {
    const user = userEvent.setup();
    render(<App />);

    const incrementBtn = screen.getByRole('button', { name: /increment/i });
    await user.click(incrementBtn);
    expect(screen.getByRole('heading', { name: /count:\s*1/i })).toBeInTheDocument();

    await user.click(incrementBtn);
    await user.click(incrementBtn);
    expect(screen.getByRole('heading', { name: /count:\s*3/i })).toBeInTheDocument();
  });

  test('decrements count including below zero', async () => {
    const user = userEvent.setup();
    render(<App />);

    const decrementBtn = screen.getByRole('button', { name: /decrement/i });
    await user.click(decrementBtn);
    expect(screen.getByRole('heading', { name: /count:\s*-1/i })).toBeInTheDocument();

    await user.click(decrementBtn);
    expect(screen.getByRole('heading', { name: /count:\s*-2/i })).toBeInTheDocument();
  });

  test('resets count to 0 and allows subsequent increments or decrements', async () => {
    const user = userEvent.setup();
    render(<App />);

    const incrementBtn = screen.getByRole('button', { name: /increment/i });
    const decrementBtn = screen.getByRole('button', { name: /decrement/i });
    const resetBtn = screen.getByRole('button', { name: /reset/i });

    await user.click(incrementBtn);
    await user.click(incrementBtn);
    expect(screen.getByRole('heading', { name: /count:\s*2/i })).toBeInTheDocument();

    await user.click(resetBtn);
    expect(screen.getByRole('heading', { name: /count:\s*0/i })).toBeInTheDocument();

    await user.click(decrementBtn);
    expect(screen.getByRole('heading', { name: /count:\s*-1/i })).toBeInTheDocument();
  });
});
