import { ActivityIndicator, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { C, R } from '@/theme/leanr';
import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

type Props = {
  label: string;
  onPress?: () => void;
  kind?: 'primary' | 'glass';
  size?: 'lg' | 'md' | 'sm';
  icon?: IconName;
  iconAfter?: IconName;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, kind = 'primary', size = 'lg', icon, iconAfter, disabled, loading, style }: Props) {
  const h = size === 'lg' ? 58 : size === 'md' ? 48 : 38;
  const radius = size === 'sm' ? R.pill : size === 'md' ? 14 : 18;
  const textV = size === 'lg' ? 'bodyL' : size === 'md' ? 'bodyBold' : 'captionBold';
  const primary = kind === 'primary' && !disabled;
  const fg = primary ? C.onBrand : disabled ? C.text3 : C.text;
  const inner = (
    <View style={[styles.row, { height: h, paddingHorizontal: size === 'sm' ? 14 : 20 }]}>
      {loading ? <ActivityIndicator color={fg} /> : null}
      {icon && !loading ? <Icon name={icon} size={size === 'lg' ? 20 : 16} color={fg} stroke={2.2} /> : null}
      <Txt
        v={size === 'lg' ? 'displayS' : textV}
        color={fg}
        numberOfLines={1}
        style={size === 'lg' ? { fontSize: 20, lineHeight: 24, paddingRight: 2 } : undefined}>
        {label}
      </Txt>
      {iconAfter && !loading ? <Icon name={iconAfter} size={size === 'lg' ? 20 : 16} color={fg} stroke={2.2} /> : null}
    </View>
  );
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }, style]}>
      {primary ? (
        <View style={[styles.primary, { borderRadius: radius }]}>{inner}</View>
      ) : (
        <Glass radius={radius}>{inner}</Glass>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  primary: {
    backgroundColor: C.yellow,
    shadowColor: C.yellow,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});
