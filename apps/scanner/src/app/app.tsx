import { BrowserRouter } from 'react-router-dom';
import { RootRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  );
}

export default App;
