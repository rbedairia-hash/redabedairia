/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Projects from './pages/Projects';
import Photography from './pages/Photography';
import Process from './pages/Process';
import ProfileCV from './pages/ProfileCV';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile-cv" element={<ProfileCV />} />
          <Route path="expertise" element={<Expertise />} />
          <Route path="projects" element={<Projects />} />
          <Route path="photography" element={<Photography />} />
          <Route path="process" element={<Process />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
