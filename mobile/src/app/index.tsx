import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { C } from '@/theme/leanr';
import { Button } from '@/ui/Button';
import { Glass } from '@/ui/Glass';
import { Logo, Ring, Dot } from '@/ui/bits';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Txt';

export default function Welcome() {
  return (
    <Screen scroll={false} orbs="a" contentStyle={{ paddingTop: 72 }}>
      <Logo width={132} />

      <View style={styles.hero} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Glass style={[styles.card, { left: 4, top: 14, transform: [{ rotate: '-5deg' }] }]}>
          <View style={styles.liveRow}>
            <Dot size={8} />
            <Txt v="tiny" color={C.yellow}>Live now</Txt>
          </View>
          <Txt v="displayS">Power yoga</Txt>
          <Txt v="caption" color={C.text2}>with Ananya Rao · 45 min</Txt>
        </Glass>
        <Glass style={[styles.card, styles.cardB]}>
          <Ring size={52} pct={0.64} thickness={6} />
          <View>
            <Txt v="numberL">1,750</Txt>
            <Txt v="caption" color={C.text2}>kcal · your daily target</Txt>
          </View>
        </Glass>
      </View>

      <View style={{ gap: 14, marginTop: 8 }}>
        <Txt v="displayXL">
          Eat right.{'\n'}Train hard.{'\n'}
          <Txt v="displayXL" color={C.yellow}>Get lean.</Txt>
        </Txt>
        <Txt v="body" color={C.text2} style={{ maxWidth: 320, fontSize: 15, lineHeight: 22 }}>
          Personal diet plans, live yoga & HIIT classes, an AI coach that checks your form, and PT you book by the slot.
        </Txt>
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ gap: 10 }}>
        <Button label="Get started" iconAfter="arrowR" onPress={() => router.push('/sign-up')} />
        <Txt v="caption" color={C.text2} center>15 quick questions · then 3 days free</Txt>
        <Pressable accessibilityRole="link" onPress={() => router.push({ pathname: '/sign-up', params: { mode: 'login' } })} style={{ paddingVertical: 8 }}>
          <Txt v="bodyS" color={C.text2} center>
            Already a member? <Txt v="bodyBold" color={C.yellow}>Log in</Txt>
          </Txt>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { height: 216, marginTop: 8 },
  card: { position: 'absolute', padding: 14, gap: 6, width: 226 },
  cardB: { right: 0, top: 108, width: 206, flexDirection: 'row', alignItems: 'center', gap: 12, transform: [{ rotate: '4deg' }] },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
