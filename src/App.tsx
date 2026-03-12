import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Realisations from './pages/Realisations';
import Methode from './pages/Methode';
import Studio from './pages/Studio';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="expertise" element={<Expertise />} />
          <Route path="realisations" element={<Realisations />} />
          <Route path="methode" element={<Methode />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
