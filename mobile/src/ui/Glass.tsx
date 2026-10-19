import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { C, R } from '@/theme/leanr';

type Props = ViewProps & { variant?: 'g' | 'y' | 'nav'; radius?: number };

// Frosted panel: translucent fill + hairline border + a soft diagonal sheen.
export function Glass({ variant = 'g', radius = R.lg, style, children, ...rest }: Props) {
  const fill = variant === 'y' ? C.glassY : variant === 'nav' ? C.nav : C.glass;
  const line = variant === 'y' ? C.glassYLine : C.glassLine;
  const sheen = variant === 'y' ? 'rgba(253,236,6,0.14)' : 'rgba(255,255,255,0.08)';
  return (
    <View
      {...rest}
      style={[{ backgroundColor: fill, borderColor: line, borderWidth: 1, borderRadius: radius, overflow: 'hidden' }, style]}>
      <LinearGradient
        pointerEvents="none"
        colors={[sheen, 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}
