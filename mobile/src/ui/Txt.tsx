import { Children } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';

import { C, F } from '@/theme/leanr';

const V = {
  displayXL: { fontFamily: F.display, fontSize: 46, lineHeight: 46, textTransform: 'uppercase' },
  displayL: { fontFamily: F.display, fontSize: 34, lineHeight: 35, textTransform: 'uppercase' },
  displayM: { fontFamily: F.display, fontSize: 30, lineHeight: 31, textTransform: 'uppercase' },
  displayS: { fontFamily: F.display, fontSize: 22, lineHeight: 24, textTransform: 'uppercase' },
  title: { fontFamily: F.display, fontSize: 19, lineHeight: 23, textTransform: 'uppercase' },
  question: { fontFamily: F.display, fontSize: 29, lineHeight: 32 },
  numberXL: { fontFamily: F.number, fontSize: 56, lineHeight: 60 },
  numberL: { fontFamily: F.number, fontSize: 26, lineHeight: 30 },
  numberM: { fontFamily: F.number, fontSize: 18, lineHeight: 22 },
  numberS: { fontFamily: F.number, fontSize: 15, lineHeight: 19 },
  bodyL: { fontFamily: F.xbold, fontSize: 16, lineHeight: 21 },
  bodyBold: { fontFamily: F.xbold, fontSize: 14, lineHeight: 19 },
  body: { fontFamily: F.body, fontSize: 14, lineHeight: 21 },
  bodyS: { fontFamily: F.body, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: F.semibold, fontSize: 12, lineHeight: 16 },
  captionBold: { fontFamily: F.xbold, fontSize: 12, lineHeight: 16 },
  label: { fontFamily: F.xbold, fontSize: 12, lineHeight: 16, letterSpacing: 1.4, textTransform: 'uppercase' },
  tiny: { fontFamily: F.xbold, fontSize: 11, lineHeight: 14, letterSpacing: 1.1, textTransform: 'uppercase' },
  nav: { fontFamily: F.bold, fontSize: 11, lineHeight: 14 },
} satisfies Record<string, TextStyle>;

export type TxtVariant = keyof typeof V;

type Props = TextProps & { v?: TxtVariant; color?: string; center?: boolean };

export function Txt({ v = 'body', color = C.text, center, style, children, ...rest }: Props) {
  const base = V[v];
  // Android measures text before applying textTransform, so the wider uppercase
  // text wraps its last word out of view. Uppercase the strings in JS instead.
  const caps = 'textTransform' in base;
  return (
    <Text {...rest} style={[base, caps && { textTransform: 'none' }, { color }, center && { textAlign: 'center' }, style]}>
      {caps ? Children.map(children, (c) => (typeof c === 'string' ? c.toUpperCase() : c)) : children}
    </Text>
  );
}
