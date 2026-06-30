import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark border-t border-border-dark pt-16 pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
              <span className="material-symbols-outlined text-background-dark text-lg font-bold">terminal</span>
            </div>
            <h2 className="text-xl font-bold tracking-tighter uppercase">Freiman<span className="text-primary">.Dev</span></h2>
          </div>

        </div>
        <div className="pt-8 border-t border-border-dark/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-medium">
          <p>© 2025 Freiman Dev. Excelência em Desenvolvimento Web.</p>
          <div className="flex gap-8">
            <a className="hover:text-white" href="#">Privacidade</a>
            <a className="hover:text-white" href="#">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;