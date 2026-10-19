import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { C, R } from '@/theme/leanr';
import { Button } from '@/ui/Button';
import { Glass } from '@/ui/Glass';
import { Icon } from '@/ui/Icon';
import { Bar, Dot, IconButton, Logo, Pill, Ring } from '@/ui/bits';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Txt';

const soon = (what: string) => Alert.alert(what, 'This part is coming in the next build step.');

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Screen orbs="b" bottomSpace={120}>
        <View style={styles.rowBetween}>
          <Logo width={96} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <IconButton name="bell" label="Notifications" onPress={() => soon('Notifications')} />
            <Pressable accessibilityRole="button" accessibilityLabel="Your profile" onPress={() => router.navigate('/profile')} style={styles.avatar}>
              <Txt v="bodyBold" color={C.onBrand}>AM</Txt>
            </Pressable>
          </View>
        </View>

        <Pressable accessibilityRole="button" onPress={() => router.push('/plans')}>
          <Glass variant="y" radius={16} style={styles.trial}>
            <Icon name="sparkle" size={20} color={C.yellow} />
            <View style={{ flex: 1 }}>
              <Txt v="bodyBold">Pro trial · 2 days left</Txt>
              <Txt v="caption" color={C.text2}>Free until Thu, 22 Oct</Txt>
            </View>
            <Txt v="bodyBold" color={C.yellow}>Manage</Txt>
          </Glass>
        </Pressable>

        <View style={{ gap: 4 }}>
          <Txt v="bodyS" color={C.text2}>Monday, 19 October</Txt>
          <Txt v="displayM">Hey Aarav,{'\n'}let’s move.</Txt>
        </View>

        {/* Today's AI workout */}
        <Glass variant="y" radius={26} style={{ padding: 16, gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <View style={styles.inline}>
                <Dot />
                <Txt v="tiny" color={C.yellow}>AI Coach · Today’s workout</Txt>
              </View>
              <Txt v="displayS">Inferno Full Body</Txt>
              <Txt v="bodyS" color={C.text2}>20 min · 5 exercises · Camera form check</Txt>
            </View>
            <SquatFigure />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            <Pill label="Last score 80" />
            <Pill label="Avg form 84" />
            <Pill label="2-day streak" />
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button label="Start AI workout" size="md" icon="play" style={{ flex: 1 }} onPress={() => router.navigate('/ai-coach')} />
            <Button label="All sessions" size="md" kind="glass" onPress={() => router.navigate('/ai-coach')} />
          </View>
        </Glass>

        {/* Next PT session */}
        <Glass variant="y" radius={24} style={{ padding: 18, gap: 12 }}>
          <View style={styles.rowBetween}>
            <Txt v="label" color={C.yellow}>Next PT session</Txt>
            <Pill label="In 4h 20m" kind="cta" />
          </View>
          <View style={{ gap: 2 }}>
            <Txt v="displayS">Strength & conditioning</Txt>
            <Txt v="bodyS" color={C.text2}>with Rhea Kapoor · In-studio</Txt>
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={styles.inline}><Icon name="calendar" size={18} color={C.yellow} /><Txt v="bodyBold">Today, 6:00 PM</Txt></View>
            <View style={styles.inline}><Icon name="clock" size={18} color={C.yellow} /><Txt v="bodyBold">60 min</Txt></View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button label="Reschedule" size="md" kind="glass" style={{ flex: 1 }} onPress={() => soon('Reschedule')} />
            <Button label="Details" size="md" iconAfter="arrowR" style={{ flex: 1 }} onPress={() => soon('Session details')} />
          </View>
        </Glass>

        <Pressable accessibilityRole="button" onPress={() => soon('Book a PT session')}>
          <Glass radius={20} style={[styles.inline, { padding: 14, gap: 14 }]}>
            <Glass variant="y" radius={14} style={styles.iconBox}><Icon name="dumbbell" size={24} color={C.yellow} /></Glass>
            <View style={{ flex: 1, gap: 2 }}>
              <Txt v="bodyL">Book a PT session</Txt>
              <Txt v="caption" color={C.text2}>Strength, yoga, HIIT & more · 10% off with Pro</Txt>
            </View>
            <Icon name="chevR" size={18} opacity={0.6} />
          </Glass>
        </Pressable>

        <Glass radius={22} style={[styles.inline, { padding: 12, gap: 12 }]}>
          <Glass variant="y" radius={16} style={[styles.iconBox, { width: 62, height: 62 }]}><Icon name="live" size={28} color={C.yellow} /></Glass>
          <View style={{ flex: 1, gap: 2 }}>
            <View style={styles.inline}><Dot /><Txt v="tiny" color={C.yellow}>Live now</Txt></View>
            <Txt v="bodyL">Power Yoga</Txt>
            <Txt v="caption" color={C.text2}>Ananya Rao · 45 min · 142 joined</Txt>
          </View>
          <Button label="Join" size="sm" onPress={() => router.navigate('/live')} />
        </Glass>

        <Meals />

        <Pressable accessibilityRole="button" onPress={() => router.push('/plans')}>
          <Glass radius={22} style={[styles.inline, { padding: 16, gap: 14 }]}>
            <Glass variant="y" radius={16} style={[styles.iconBox, { width: 52, height: 52 }]}><Icon name="user" size={26} color={C.yellow} /></Glass>
            <View style={{ flex: 1, gap: 2 }}>
              <Txt v="bodyBold">Want a dietitian of your own?</Txt>
              <Txt v="caption" color={C.text2}>Elite adds 1-on-1 diet coaching and weekly check-ins.</Txt>
            </View>
            <Txt v="bodyBold" color={C.yellow}>See Elite</Txt>
          </Glass>
        </Pressable>
      </Screen>

      <Pressable accessibilityRole="button" accessibilityLabel="Ask Kai, your AI coach" onPress={() => soon('Kai — AI chat')} style={styles.fab}>
        <View style={styles.fabAvatar}><Txt v="displayS" color={C.onBrand} style={{ fontSize: 17 }}>K</Txt></View>
        <View>
          <Txt v="bodyBold">Ask Kai</Txt>
          <Txt v="caption" color={C.text2}>Your AI coach</Txt>
        </View>
      </Pressable>
    </View>
  );
}

function Meals() {
  const macros: [string, string, number, string][] = [
    ['Protein', '92 / 131 g', 0.7, C.yellow],
    ['Carbs', '104 / 175 g', 0.59, C.text],
    ['Fat', '31 / 58 g', 0.53, 'rgba(255,255,255,0.5)'],
  ];
  const meals: [string, string, 'done' | 'next' | 'later'][] = [
    ['Grilled paneer & brown rice bowl', 'Lunch · 1:30 PM · 520 kcal', 'done'],
    ['Greek yogurt & almonds', 'Next up · 5:00 PM · 200 kcal', 'next'],
    ['Moong dal, quinoa & greens', 'Dinner · 8:30 PM · 420 kcal', 'later'],
  ];
  return (
    <Glass radius={24} style={{ padding: 18, gap: 14 }}>
      <View style={styles.rowBetween}>
        <View style={{ flex: 1 }}>
          <Txt v="title">Today’s meals</Txt>
          <Txt v="bodyS" color={C.text2}>Your personal Pro plan · Day 2</Txt>
        </View>
        <Txt v="bodyBold" color={C.yellow}>Full day</Txt>
      </View>
      <View style={[styles.inline, { gap: 18 }]}>
        <Ring size={88} pct={1080 / 1750}>
          <Txt v="numberM">1,080</Txt>
          <Txt v="caption" color={C.text2} style={{ fontSize: 10 }}>of 1,750 kcal</Txt>
        </Ring>
        <View style={{ flex: 1, gap: 10 }}>
          {macros.map(([l, v, p, c]) => (
            <View key={l} style={{ gap: 4 }}>
              <View style={styles.rowBetween}>
                <Txt v="captionBold">{l}</Txt>
                <Txt v="caption" color={C.text2}>{v}</Txt>
              </View>
              <Bar pct={p} color={c} />
            </View>
          ))}
        </View>
      </View>
      <View>
        {meals.map(([n, d, s]) => (
          <View key={n} style={styles.mealRow}>
            <View
              style={[
                styles.status,
                s === 'done' && { backgroundColor: C.yellow, borderColor: C.yellow },
                s === 'next' && { borderColor: C.yellow, borderStyle: 'dashed' },
              ]}>
              {s === 'done' ? <Icon name="check" size={16} color={C.onBrand} stroke={2.6} /> : null}
            </View>
            <View style={{ flex: 1 }}>
              <Txt v="bodyBold">{n}</Txt>
              <Txt v="caption" color={s === 'next' ? C.yellow : C.text2}>{d}</Txt>
            </View>
            {s === 'next' ? <Button label="Log" size="sm" onPress={() => soon('Log meal')} /> : null}
          </View>
        ))}
      </View>
    </Glass>
  );
}

function SquatFigure() {
  return (
    <Svg width={46} height={96} viewBox="110 260 170 360" accessibilityElementsHidden>
      <Circle cx={195} cy={300} r={22} stroke={C.yellow} strokeWidth={8} fill="none" />
      <Path
        d="M195 322v18M158 354h74M158 354l-12 56 34-18M232 354l12 56-34-18M158 354l6 124M232 354l-6 124M164 478l-30 50 22 76M226 478l30 50-22 76"
        stroke={C.yellow}
        strokeWidth={8}
        strokeLinecap="round"
        fill="none"
      />
      <Line x1={164} y1={478} x2={226} y2={478} stroke={C.yellow} strokeWidth={8} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' },
  trial: { height: 52, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 },
  iconBox: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  mealRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.divider },
  status: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'rgba(255,255,255,0.24)', alignItems: 'center', justifyContent: 'center' },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 112,
    height: 52,
    paddingLeft: 6,
    paddingRight: 16,
    borderRadius: R.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(40,38,6,0.95)',
    borderWidth: 1,
    borderColor: C.glassYLine,
  },
  fabAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' },
});
