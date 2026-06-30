import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border-dark/30 bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <span className="material-symbols-outlined text-background-dark font-bold">terminal</span>
          </div>
          <h2 className="text-xl font-bold tracking-tighter uppercase">
            Freiman<span className="text-primary">.Dev</span>
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a className="hover:text-primary transition-colors" href="#sobre">Sobre</a>
          <a className="hover:text-primary transition-colors" href="#servicos">Serviços</a>
          <a className="hover:text-primary transition-colors" href="#portfolio">Portfólio</a>
          <a className="hover:text-primary transition-colors" href="#contato">Contato</a>
        </div>

        <div className="hidden md:block">
            <a 
              className="bg-accent text-background-dark px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 hover:shadow-[0_0_15px_rgba(132,204,22,0.4)] transition-all flex items-center gap-2" 
              href="https://wa.me/5522998183416"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              Fale Conosco
            </a>
        </div>

        {/* Mobile Toggle */}
        <button 
            className="md:hidden text-slate-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
          <div className="md:hidden bg-background-dark border-b border-border-dark/30 px-6 py-4 flex flex-col space-y-4">
            <a className="hover:text-primary transition-colors" href="#sobre" onClick={() => setIsMobileMenuOpen(false)}>Sobre</a>
            <a className="hover:text-primary transition-colors" href="#servicos" onClick={() => setIsMobileMenuOpen(false)}>Serviços</a>
            <a className="hover:text-primary transition-colors" href="#portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfólio</a>
            <a className="hover:text-primary transition-colors" href="#contato" onClick={() => setIsMobileMenuOpen(false)}>Contato</a>
            <a 
              className="bg-accent text-background-dark px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 text-center flex items-center justify-center gap-2" 
              href="https://wa.me/5522998183416"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
                <span className="material-symbols-outlined text-lg">chat</span>
                Fale Conosco
            </a>
          </div>
      )}
    </nav>
  );
};

export default Navbar;