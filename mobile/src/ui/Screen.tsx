import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { C } from '@/theme/leanr';
import { Orbs } from './Orbs';

type Props = {
  children: ReactNode;
  orbs?: 'a' | 'b' | 'c';
  scroll?: boolean;
  /** Extra space at the bottom of scroll content (e.g. for a tab bar or sticky footer). */
  bottomSpace?: number;
  /** Content pinned to the bottom of the screen (sticky action bar). */
  footer?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, orbs = 'a', scroll = true, bottomSpace = 32, footer, contentStyle }: Props) {
  const insets = useSafeAreaInsets();
  const pad = { paddingTop: insets.top + 12, paddingHorizontal: 20, gap: 16 };
  return (
    <View style={styles.root}>
      <Orbs preset={orbs} />
      {scroll ? (
        <>
          <ScrollView
            contentContainerStyle={[pad, { paddingBottom: bottomSpace + insets.bottom }, contentStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
          {/* Fades content out under the status bar as it scrolls. */}
          <LinearGradient
            pointerEvents="none"
            colors={[C.bg, 'rgba(5,5,5,0.85)', 'rgba(5,5,5,0)']}
            locations={[0, 0.6, 1]}
            style={[styles.statusFade, { height: insets.top + 18 }]}
          />
        </>
      ) : (
        <View style={[styles.fill, pad, { paddingBottom: insets.bottom + 16 }, contentStyle]}>{children}</View>
      )}
      {footer ? <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  fill: { flex: 1 },
  statusFade: { position: 'absolute', top: 0, left: 0, right: 0 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 14,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: 'rgba(14,14,14,0.98)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: C.glassLine,
  },
});
