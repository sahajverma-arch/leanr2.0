import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { C } from '@/theme/leanr';
import { Button } from '@/ui/Button';
import { Glass } from '@/ui/Glass';
import { Icon } from '@/ui/Icon';
import { Chip, Dot, IconButton, Pill, Ring } from '@/ui/bits';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Txt';

type Focus = 'all' | 'full' | 'lower' | 'upper' | 'core';

const SESSIONS = [
  { name: 'Leg Day Destroyer', min: 18, count: 5, focus: 'lower', area: 'Lower body', level: 5, moves: 'Squats, Jump lunges, Wall sit, Glute bridges, Skater jumps' },
  { name: 'HIIT Burnout', min: 17, count: 5, focus: 'full', area: 'Full body', level: 5, moves: 'Burpees, High knees, Squat jumps, Plank jacks, Mountain climbers' },
  { name: 'Push Blitz', min: 16, count: 4, focus: 'upper', area: 'Upper body', level: 4, moves: 'Push-ups, Pike push-ups, Chair dips, Shoulder taps' },
  { name: 'Core Crusher', min: 15, count: 4, focus: 'core', area: 'Core', level: 4, moves: 'Plank, Bicycle crunches, Leg raises, Russian twists' },
] as const;

const FILTERS: [Focus, string][] = [['all', 'All'], ['full', 'Full body'], ['lower', 'Lower body'], ['upper', 'Upper body'], ['core', 'Core']];

const startSession = (name: string) =>
  Alert.alert(name, 'Camera form tracking is the next build step. It needs a development build with the camera + pose model.');

export default function AICoach() {
  const [focus, setFocus] = useState<Focus>('all');
  const list = SESSIONS.filter((s) => focus === 'all' || s.focus === focus);

  return (
    <Screen orbs="a" bottomSpace={120}>
      <View style={styles.rowBetween}>
        <View style={{ flex: 1, gap: 6 }}>
          <View style={styles.inline}><Dot /><Txt v="tiny" color={C.yellow}>AI-powered</Txt></View>
          <Txt v="displayL">AI Coach</Txt>
          <Txt v="body" color={C.text2}>Train in front of your camera. AI counts every rep and fixes your form as you go.</Txt>
        </View>
        <IconButton name="sparkle" label="How AI Coach works" onPress={() => Alert.alert('AI Coach', 'Your camera tracks 33 body points on your phone. Nothing is recorded or uploaded.')} />
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        {[['3', 'Sessions this week'], ['84', 'Avg form score'], ['2', 'Day streak']].map(([v, l], i) => (
          <Glass key={l} variant={i === 1 ? 'y' : 'g'} radius={18} style={{ flex: 1, padding: 12, gap: 2 }}>
            <Txt v="numberL" color={i === 1 ? C.yellow : C.text}>{v}</Txt>
            <Txt v="caption" color={C.text2}>{l}</Txt>
          </Glass>
        ))}
      </View>

      <Glass variant="y" radius={26} style={{ padding: 16, gap: 12 }}>
        <Pill label="Today's pick · Hardcore" kind="cta" />
        <View style={{ gap: 3 }}>
          <Txt v="displayS">Inferno Full Body</Txt>
          <Txt v="bodyS" color={C.text2}>20 min · 5 exercises · Jump squats, Push-ups, Lunges +2</Txt>
        </View>
        <Intensity level={4} />
        <Button label="Start session" size="md" icon="play" onPress={() => startSession('Inferno Full Body')} />
      </Glass>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {FILTERS.map(([id, label]) => (
          <Chip key={id} label={label} on={focus === id} onPress={() => setFocus(id)} />
        ))}
      </View>

      <View style={styles.rowBetween}>
        <Txt v="label" color={C.text2}>Hardcore sessions</Txt>
        <Txt v="captionBold" color={C.text2}>{list.length} {list.length === 1 ? 'session' : 'sessions'}</Txt>
      </View>

      {list.map((s) => (
        <Pressable key={s.name} accessibilityRole="button" onPress={() => startSession(s.name)}>
          <Glass radius={18} style={[styles.inline, { padding: 14, gap: 14 }]}>
            <Glass variant="y" radius={16} style={styles.minBox}>
              <Txt v="numberL" color={C.yellow} style={{ fontSize: 22, lineHeight: 24 }}>{s.min}</Txt>
              <Txt v="tiny" color={C.yellow}>Min</Txt>
            </Glass>
            <View style={{ flex: 1, gap: 3 }}>
              <Txt v="bodyL">{s.name}</Txt>
              <Txt v="captionBold" color={C.text2}>{s.count} exercises · {s.area}</Txt>
              <Txt v="caption" color={C.text3} numberOfLines={1}>{s.moves}</Txt>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 8 }}>
              <Intensity level={s.level} />
              <Icon name="chevR" size={18} opacity={0.6} />
            </View>
          </Glass>
        </Pressable>
      ))}

      <Glass radius={20} style={[styles.inline, { padding: 12, gap: 14 }]}>
        <Ring size={48} pct={0.8} thickness={5}><Txt v="numberS">80</Txt></Ring>
        <View style={{ flex: 1 }}>
          <Txt v="tiny" color={C.yellow}>Last session</Txt>
          <Txt v="bodyBold">Inferno Full Body</Txt>
          <Txt v="caption" color={C.text2}>2 days ago · 131 clean reps</Txt>
        </View>
      </Glass>

      <View style={[styles.inline, { alignItems: 'flex-start' }]}>
        <Icon name="lock" size={16} color={C.yellow} />
        <Txt v="caption" color={C.text3} style={{ flex: 1 }}>Your camera feed stays on your phone. Nothing is recorded or uploaded.</Txt>
      </View>
    </Screen>
  );
}

function Intensity({ level }: { level: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }} accessibilityLabel={`Intensity ${level} of 5`}>
      {[8, 11, 14, 17, 20].map((h, i) => (
        <View key={h} style={{ width: 5, height: h, borderRadius: 2, backgroundColor: i < level ? C.yellow : C.track }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  minBox: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center' },
});
