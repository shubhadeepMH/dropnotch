import { useState, useEffect } from 'react';
import { Navbar, Hero, Services, Product, About, Contact, Footer, PrivacyPolicy } from './sections';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
      setHash(window.location.hash);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Check if current path matches privacy policy routes
  const isPrivacyRoute =
    path === '/privacy' ||
    path === '/privacy-policy' ||
    hash === '#/privacy' ||
    hash === '#/privacy-policy';

  // Check if we are in mobile app WebView mode (?app=true) in either search query or hash fragment
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const isAppMode = searchParams.get('app') === 'true' || hashParams.get('app') === 'true';

  if (isPrivacyRoute) {
    if (isAppMode) {
      // Standalone app-like layout for mobile app WebView
      return <PrivacyPolicy />;
    }

    // Standard website layout containing headers and footers
    return (
      <div className="relative min-h-screen flex flex-col bg-[#0B0F19]">
        <main className="flex-grow">
          <PrivacyPolicy />
        </main>
        <Footer />
      </div>
    );
  }

  // Landing page routing
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F19]">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Product />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
