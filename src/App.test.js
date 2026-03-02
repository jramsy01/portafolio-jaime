import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza la sección principal de proyectos', () => {
  render(<App />);
  const title = screen.getByText(/proyectos de gran impacto/i);
  expect(title).toBeInTheDocument();
});
