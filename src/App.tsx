import { Navbar, Hero, Services, Product, About, Contact, Footer } from './sections';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
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
