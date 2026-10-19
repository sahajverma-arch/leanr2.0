import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { labelFor, planFromAnswers } from '@/data/onboarding';
import { useAnswers } from '@/state/answers';
import { C, R } from '@/theme/leanr';
import { Button } from '@/ui/Button';
import { Glass } from '@/ui/Glass';
import { Icon, type IconName } from '@/ui/Icon';
import { BackButton, Logo, Pill } from '@/ui/bits';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Txt';

// Placeholder prices — confirm before launch.
const TIERS = [
  { id: 'start', name: 'Lean Start', price: '₹499', tag: 'Diet library + 8 live classes a month', badge: '',
    features: ['All published diet plans', '8 live classes a month', 'AI Coach: 3 sessions a week', 'Book PT sessions anytime'] },
  { id: 'pro', name: 'Lean Pro', price: '₹999', tag: 'Personal diet, unlimited live & AI Coach', badge: 'Most popular',
    features: ['Everything in Start', 'Diet plan built from your 15 answers', 'Unlimited live classes + replays', 'Unlimited AI Coach + Kai chat', '10% off every PT session'] },
  { id: 'elite', name: 'Lean Elite', price: '₹2,499', tag: 'Your own dietitian, 1-on-1', badge: '1-on-1 diet',
    features: ['Everything in Pro', 'A dedicated dietitian, just for you', 'Diet adjusted every week', 'Weekly 1-on-1 video check-in', 'Chat with your dietitian anytime'] },
] as const;

export default function Plans() {
  const { answers } = useAnswers();
  const p = planFromAnswers(answers);
  const [tier, setTier] = useState<(typeof TIERS)[number]['id']>('pro');
  const [started, setStarted] = useState(false);
  const cur = TIERS.find((t) => t.id === tier)!;

  const goal = labelFor('goal', String(answers.goal ?? 'lose')) || 'Lose fat';
  const days = answers.days ? `${labelFor('days', String(answers.days))} a week` : '3–4 days a week';
  const diet = labelFor('diet', String(answers.diet ?? '')) || 'Vegetarian';

  const footer = (
    <>
      <Button label="Start 3-day free trial" onPress={() => setStarted(true)} />
      <Txt v="caption" color={C.text2} center>Free for 3 days · then {cur.price}/month · cancel anytime</Txt>
    </>
  );

  return (
    <Screen orbs="b" bottomSpace={150} footer={footer}>
      <View style={styles.header}>
        <BackButton />
        <Logo width={92} />
        <View style={{ width: 44 }} />
      </View>

      <View style={{ gap: 6 }}>
        <Txt v="label" color={C.yellow}>Based on your 15 answers</Txt>
        <Txt v="displayL">Your plan{'\n'}is ready.</Txt>
        <Txt v="bodyS" color={C.text2}>Pick a membership to unlock it. Every plan starts with 3 days free.</Txt>
      </View>

      <Glass radius={24} style={{ padding: 16, gap: 12 }}>
        <View style={styles.tiles}>
          <Tile label="Goal" value={goal} />
          <Tile label="Weight" value={`${p.weight} → ${p.target} kg`} num />
          <Tile label="Daily calories" value={`${p.kcal.toLocaleString('en-IN')} kcal`} num hi />
          <Tile label="Training" value={days} />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          <Pill label={diet} />
          <Pill label={`${p.protein} g protein a day`} />
        </View>
      </Glass>

      <View style={styles.rowBetween}>
        <Txt v="displayS" style={{ flex: 1 }}>Choose your plan</Txt>
        <Txt v="caption" color={C.text2}>Billed monthly</Txt>
      </View>

      {TIERS.map((t) => {
        const on = t.id === tier;
        return (
          <Pressable key={t.id} accessibilityRole="radio" accessibilityState={{ checked: on }} onPress={() => setTier(t.id)}>
            <Glass variant={on ? 'y' : 'g'} radius={22} style={[{ padding: 16, gap: 12 }, on && { borderColor: C.yellow, borderWidth: 1.5 }]}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <View style={[styles.radio, on && { borderColor: C.yellow }]}>{on ? <View style={styles.radioDot} /> : null}</View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Txt v="displayS">{t.name}</Txt>
                  {t.badge ? <Pill label={t.badge} kind="cta" style={{ alignSelf: 'flex-start' }} /> : null}
                  <Txt v="bodyS" color={C.text2}>{t.tag}</Txt>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Txt v="numberL" color={on ? C.yellow : C.text}>{t.price}</Txt>
                  <Txt v="caption" color={C.text2}>per month</Txt>
                </View>
              </View>
              {on ? (
                <View style={{ gap: 9, paddingLeft: 34 }}>
                  {t.features.map((f, k) => (
                    <View key={f} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
                      <Icon name="check" size={16} color={C.yellow} stroke={2.6} />
                      <Txt v={k === 0 && t.id !== 'start' ? 'bodyS' : 'bodyBold'} color={k === 0 && t.id !== 'start' ? C.text2 : C.text} style={{ flex: 1 }}>{f}</Txt>
                    </View>
                  ))}
                </View>
              ) : null}
            </Glass>
          </Pressable>
        );
      })}

      <Glass radius={24} style={{ padding: 18, gap: 4 }}>
        <Txt v="title" style={{ marginBottom: 10 }}>How your 3 free days work</Txt>
        <Step icon="lockOpen" first title="Today · Mon 19 Oct" text={`Full ${cur.name} access unlocked. No charge today.`} />
        <Step icon="bell" title="Wed 21 Oct" text="We remind you a day before your trial ends." />
        <Step icon="card" last title="Thu 22 Oct" text={`Your ${cur.price}/month membership starts. Cancel before then and pay nothing.`} />
      </Glass>

      <Modal visible={started} transparent animationType="slide" onRequestClose={() => setStarted(false)}>
        <View style={styles.sheetBackdrop}>
          <Glass variant="nav" radius={26} style={styles.sheet}>
            <View style={styles.badge}><Icon name="check" size={32} color={C.onBrand} stroke={2.6} /></View>
            <Txt v="displayL">Your trial is on!</Txt>
            <Txt v="body" color={C.text2}>{cur.name} is unlocked until Thu, 22 Oct. We’ll remind you on Wednesday before anything is charged.</Txt>
            <Button label="Let's go" iconAfter="arrowR" onPress={() => { setStarted(false); router.replace('/home'); }} />
          </Glass>
        </View>
      </Modal>
    </Screen>
  );
}

function Tile({ label, value, num, hi }: { label: string; value: string; num?: boolean; hi?: boolean }) {
  return (
    <View style={[styles.tile, hi && { backgroundColor: C.glassY }]}>
      <Txt v="caption" color={C.text2}>{label}</Txt>
      <Txt v={num ? 'numberM' : 'bodyL'} color={hi ? C.yellow : C.text}>{value}</Txt>
    </View>
  );
}

function Step({ icon, title, text, first, last }: { icon: IconName; title: string; text: string; first?: boolean; last?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', gap: 14 }}>
      <View style={{ alignItems: 'center' }}>
        {first ? (
          <View style={[styles.stepDot, { backgroundColor: C.yellow }]}><Icon name={icon} size={16} color={C.onBrand} stroke={2.2} /></View>
        ) : (
          <Glass radius={R.pill} style={styles.stepDot}><Icon name={icon} size={16} color={C.yellow} /></Glass>
        )}
        {!last ? <View style={{ width: 2, flex: 1, minHeight: 18, backgroundColor: first ? 'rgba(253,236,6,0.5)' : C.track }} /> : null}
      </View>
      <View style={{ flex: 1, gap: 2, paddingBottom: last ? 0 : 14 }}>
        <Txt v="bodyBold">{title}</Txt>
        <Txt v="bodyS" color={C.text2}>{text}</Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowBetween: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tile: { width: '48.6%', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 12, gap: 2, backgroundColor: C.glass },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.yellow },
  stepDot: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  sheetBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: { padding: 22, paddingBottom: 34, gap: 16, backgroundColor: '#141414', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  badge: { width: 64, height: 64, borderRadius: 20, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' },
});
