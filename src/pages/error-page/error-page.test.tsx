import { render, screen } from '@testing-library/react';
import ErrorPage from './error-page';

describe('Component: Error Page', () => {
  it('should create a error page', () => {
    const errorContainerTestId = 'error-container';
    render(<ErrorPage/>);
    const errorContainer = screen.getByTestId(errorContainerTestId);
    expect(errorContainer).toBeInTheDocument();
  });
});
