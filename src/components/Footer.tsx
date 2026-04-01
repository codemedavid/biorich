import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 py-8 border-t border-charcoal-800">
      <div className="container mx-auto px-4 flex justify-center">
        <img
          src="/logo.png"
          alt="BIORICH Science"
          className="h-14 w-auto object-contain bg-white/10 rounded-lg p-2"
        />
      </div>
    </footer>
  );
};

export default Footer;
