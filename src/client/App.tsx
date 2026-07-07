import { Routes, Route, Outlet } from 'react-router-dom';

import Home from 'client/views/Home.tsx';
import Results from 'client/views/Results.tsx';
import About from 'client/views/About.tsx';
import Privacy from 'client/views/Privacy.tsx';
import Terms from 'client/views/Terms.tsx';
import Docs from 'client/views/Docs.tsx';
import NotFound from 'client/views/NotFound.tsx';

import ErrorBoundary from 'client/components/boundaries/PageError.tsx';
import GlobalStyles from './styles/globals.tsx';

const Layout = () => {
  return (
    <>
      <GlobalStyles />
      <Outlet />
    </>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/check" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="docs" element={<Docs />} />
          <Route path=":urlToScan" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="docs" element={<Docs />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
