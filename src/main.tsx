import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Restore the saved theme before the first paint to avoid a flash of the
// wrong theme (same behaviour as the original site).
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light-mode');
}

createRoot(document.getElementById('root')!).render(<App />);
