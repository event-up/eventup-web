import { render } from '@testing-library/react';

import ScannerPage from './CheckerPage';

describe('ScannerPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScannerPage />);
    expect(baseElement).toBeTruthy();
  });
});
