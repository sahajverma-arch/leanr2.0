import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { C } from '@/theme/leanr';
import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

type TabDef = { name: string; label: string; icon: IconName; center?: boolean; dot?: boolean };

const TABS: TabDef[] = [
  { name: 'home', label: 'Home', icon: 'home' },
  { name: 'diets', label: 'Diets', icon: 'leaf' },
  { name: 'ai-coach', label: 'AI Coach', icon: 'scan', center: true },
  { name: 'live', label: 'Live', icon: 'live', dot: true },
  { name: 'profile', label: 'Profile', icon: 'user' },
];

export function LeanrTabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const current = state.routes[state.index]?.name;

  const go = (name: string) => {
    const route = state.routes.find((r) => r.name === name);
    if (route && current !== name) navigateToTab(route.key);
  };

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom: insets.bottom + 10 }]}>
      <View style={styles.bar}>
        {TABS.map((t) => {
          const on = current === t.name;
          if (t.center) {
            return (
              <Pressable key={t.name} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={t.label} onPress={() => go(t.name)} style={styles.item}>
                <View style={styles.raised}>
                  <Icon name={t.icon} size={28} color={C.onBrand} stroke={2} />
                </View>
                <Txt v="nav" color={on ? C.yellow : C.text2} style={on && { fontFamily: 'Manrope_800ExtraBold' }}>{t.label}</Txt>
              </Pressable>
            );
          }
          return (
            <Pressable key={t.name} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={t.label} onPress={() => go(t.name)} style={styles.item}>
              <View style={[styles.iconPill, on && { backgroundColor: 'rgba(253,236,6,0.16)' }]}>
                <Icon name={t.icon} size={22} color={on ? C.yellow : C.text} opacity={on ? 1 : 0.72} />
                {t.dot ? <View style={styles.dot} /> : null}
              </View>
              <Txt v="nav" color={on ? C.yellow : C.text2} style={on && { fontFamily: 'Manrope_800ExtraBold' }}>{t.label}</Txt>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 14, right: 14 },
  bar: {
    height: 68,
    borderRadius: 26,
    backgroundColor: C.nav,
    borderWidth: 1,
    borderColor: C.glassLine,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, height: '100%' },
  iconPill: { width: 46, height: 28, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', top: 1, right: 9, width: 7, height: 7, borderRadius: 4, backgroundColor: C.yellow },
  raised: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginTop: -34,
    backgroundColor: C.yellow,
    borderWidth: 4,
    borderColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.yellow,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});
