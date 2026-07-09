'use client';

import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  variant?: 'gold' | 'white' | 'dark';
}

export function Logo({
  width = 60,
  height = 60,
  showText = false,
  showTagline = false,
  className = '',
  variant = 'gold',
}: LogoProps) {
  // Color configuration based on the brand identity sheet
  const colorMap = {
    gold: {
      primary: 'url(#logoGoldGrad)',
      text: '#D4AF37',
      tagline: '#B8860B',
      border: 'rgba(212, 175, 55, 0.2)',
    },
    white: {
      primary: '#FFFFFF',
      text: '#FFFFFF',
      tagline: '#FSF1E8',
      border: 'rgba(255, 255, 255, 0.2)',
    },
    dark: {
      primary: '#3B2F2F',
      text: '#3B2F2F',
      tagline: '#3B2F2F',
      border: 'rgba(59, 47, 47, 0.2)',
    },
  };

  const colors = colorMap[variant];

  // Helper for generating rotated star-anise petals
  const renderPetals = () => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = i * 45;
      return (
        <path
          key={i}
          d="M 50 56 C 48.5 53.5, 48.5 49.5, 50 48.5 C 51.5 49.5, 51.5 53.5, 50 56 Z"
          fill={colors.primary}
          transform={`rotate(${angle} 50 59)`}
        />
      );
    });
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`} style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Gold Gradient from the DUM. Brand Identity sheet */}
          <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
          
          {/* Steam glow filter */}
          <filter id="steamGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Steam Waves --- */}
        <g filter="url(#steamGlow)">
          {/* Left Steam */}
          <path
            d="M 44 28 C 42.5 24, 44 20, 46 16 C 47.5 13, 46.5 10, 45 7.5"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Center Steam (Taller) */}
          <path
            d="M 50 28 C 48 23, 50.5 18, 53 13 C 55 9, 53.5 5, 51.5 2"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Steam */}
          <path
            d="M 56 28 C 54.5 24, 56 20, 58 16 C 59.5 13, 58.5 10, 57 7.5"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- Handi Pot Lid --- */}
        <path
          d="M 28 34 H 72 C 74.5 34, 76 35.5, 76 37.5 C 76 39.5, 74.5 41, 72 41 H 28 C 25.5 41, 24 39.5, 24 37.5 C 24 35.5, 25.5 34, 28 34 Z"
          fill={colors.primary}
        />

        {/* --- Handi Pot Body --- */}
        <path
          d="M 26 44 H 74 C 74 44, 78 57, 72 67 C 67.5 74.5, 59.5 76, 50 76 C 40.5 76, 32.5 74.5, 28 67 C 22 57, 26 44, 26 44 Z"
          fill={colors.primary}
        />

        {/* --- Star Anise Motif in the Center of Pot --- */}
        {renderPetals()}
        <circle cx="50" cy="59" r="2.5" fill={colors.primary} />
      </svg>

      {showText && (
        <div 
          style={{ 
            marginTop: '8px', 
            fontFamily: 'var(--font-heading), "Cinzel", "Playfair Display", serif',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: colors.text,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            lineHeight: 1
          }}
        >
          Dum<span style={{ color: '#E4A853' }}>.</span>
        </div>
      )}

      {showTagline && (
        <div
          style={{
            marginTop: '6px',
            fontFamily: '"Montserrat", "Lato", sans-serif',
            fontSize: '0.65rem',
            fontWeight: '600',
            color: colors.tagline,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            opacity: 0.85
          }}
        >
          Every Grain Tells A Story
        </div>
      )}
    </div>
  );
}
