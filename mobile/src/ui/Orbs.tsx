import { StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { C } from '@/theme/leanr';

type Orb = { x: number; y: number; r: number; color: string; o: number };

// Soft yellow/amber glows behind the glass. x is a fraction of screen width, y is in px.
const PRESETS: Record<'a' | 'b' | 'c', Orb[]> = {
  a: [
    { x: 0.95, y: 60, r: 220, color: C.yellow, o: 0.32 },
    { x: 0.0, y: 460, r: 190, color: C.amber, o: 0.22 },
    { x: 0.9, y: 760, r: 200, color: C.yellow, o: 0.16 },
  ],
  b: [
    { x: 0.05, y: 40, r: 220, color: C.yellow, o: 0.3 },
    { x: 1.0, y: 420, r: 190, color: C.amber, o: 0.22 },
    { x: 0.1, y: 820, r: 200, color: C.yellow, o: 0.18 },
  ],
  c: [
    { x: 0.5, y: 10, r: 240, color: C.yellow, o: 0.28 },
    { x: 0.0, y: 520, r: 190, color: C.amber, o: 0.2 },
  ],
};

export function Orbs({ preset = 'a' }: { preset?: keyof typeof PRESETS }) {
  const { width } = useWindowDimensions();
  const orbs = PRESETS[preset];
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        {orbs.map((o, i) => (
          <RadialGradient key={i} id={`orb${i}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={o.color} stopOpacity={o.o} />
            <Stop offset="0.55" stopColor={o.color} stopOpacity={o.o * 0.45} />
            <Stop offset="1" stopColor={o.color} stopOpacity={0} />
          </RadialGradient>
        ))}
      </Defs>
      {orbs.map((o, i) => (
        <Circle key={i} cx={o.x * width} cy={o.y} r={o.r} fill={`url(#orb${i})`} />
      ))}
    </Svg>
  );
}
