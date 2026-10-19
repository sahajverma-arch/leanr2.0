import { router } from 'expo-router';
import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { C, R } from '@/theme/leanr';
import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

export function Logo({ width = 96 }: { width?: number }) {
  return (
    <Image
      source={require('@/assets/images/leanr-logo.png')}
      style={{ width, height: (width * 103) / 596 }}
      contentFit="contain"
      accessibilityLabel="Leanr"
    />
  );
}

export function IconButton({ name, label, onPress, variant = 'g', size = 44 }: { name: IconName; label: string; onPress?: () => void; variant?: 'g' | 'y'; size?: number }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} hitSlop={6}>
      <Glass variant={variant} radius={R.pill} style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={name} size={20} color={variant === 'y' ? C.yellow : C.text} />
      </Glass>
    </Pressable>
  );
}

export function BackButton({ onPress }: { onPress?: () => void }) {
  return <IconButton name="chevL" label="Go back" onPress={onPress ?? (() => (router.canGoBack() ? router.back() : router.replace('/')))} />;
}

export function Chip({ label, on, onPress }: { label: string; on?: boolean; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected: !!on }} onPress={onPress}>
      {on ? (
        <View style={[styles.chip, { backgroundColor: C.yellow }]}>
          <Txt v="bodyBold" color={C.onBrand}>{label}</Txt>
        </View>
      ) : (
        <Glass radius={R.pill} style={styles.chip}>
          <Txt v="bodyBold">{label}</Txt>
        </Glass>
      )}
    </Pressable>
  );
}

export function Pill({ label, kind = 'g', style }: { label: string; kind?: 'g' | 'y' | 'cta'; style?: StyleProp<ViewStyle> }) {
  if (kind === 'cta') {
    return (
      <View style={[styles.pill, { backgroundColor: C.yellow }, style]}>
        <Txt v="tiny" color={C.onBrand}>{label}</Txt>
      </View>
    );
  }
  return (
    <Glass variant={kind} radius={R.pill} style={[styles.pill, style]}>
      <Txt v="captionBold" color={kind === 'y' ? C.yellow : C.text}>{label}</Txt>
    </Glass>
  );
}

export function Ring({ size, pct, thickness = 9, children }: { size: number; pct: number; thickness?: number; children?: ReactNode }) {
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={[StyleSheet.absoluteFill, { transform: [{ rotate: '-90deg' }] }]}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={C.track} strokeWidth={thickness} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={C.yellow}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circ * Math.min(1, Math.max(0, pct))} ${circ}`}
        />
      </Svg>
      {children}
    </View>
  );
}

export function Bar({ pct, color = C.yellow, height = 6 }: { pct: number; color?: string; height?: number }) {
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: C.track, overflow: 'hidden' }}>
      <View style={{ width: `${Math.round(Math.min(1, pct) * 100)}%`, height, borderRadius: height / 2, backgroundColor: color }} />
    </View>
  );
}

export function Dot({ size = 7 }: { size?: number }) {
  return <View style={{ width: size, height: size, borderRadius: size, backgroundColor: C.yellow, shadowColor: C.yellow, shadowOpacity: 0.9, shadowRadius: 6, elevation: 4 }} />;
}

const styles = StyleSheet.create({
  chip: { height: 38, paddingHorizontal: 16, borderRadius: R.pill, alignItems: 'center', justifyContent: 'center' },
  pill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: R.pill, alignSelf: 'flex-start' },
});
