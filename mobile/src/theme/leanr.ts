// Leanr design tokens — mirrors the glass design on the canvas and in Figma.

export const C = {
  bg: '#050505',
  yellow: '#FDEC06',
  amber: '#FF8A00',
  coral: '#FF5A3C',
  text: '#FFFFFF',
  text2: 'rgba(255,255,255,0.72)',
  text3: 'rgba(255,255,255,0.55)',
  onBrand: '#000000',
  glass: 'rgba(255,255,255,0.08)',
  glassLine: 'rgba(255,255,255,0.14)',
  glassY: 'rgba(253,236,6,0.14)',
  glassYLine: 'rgba(253,236,6,0.42)',
  nav: 'rgba(20,20,20,0.92)',
  track: 'rgba(255,255,255,0.12)',
  divider: 'rgba(255,255,255,0.10)',
} as const;

export const F = {
  display: 'ChakraPetch_700Bold_Italic',
  displaySemi: 'ChakraPetch_600SemiBold_Italic',
  number: 'ChakraPetch_700Bold',
  body: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  xbold: 'Manrope_800ExtraBold',
} as const;

export const R = { sm: 12, md: 16, lg: 22, xl: 26, pill: 999 } as const;
