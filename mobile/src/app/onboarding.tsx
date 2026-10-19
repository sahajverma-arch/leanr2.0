import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { labelFor, planFromAnswers, QUESTIONS, type Answers } from '@/data/onboarding';
import { useAnswers } from '@/state/answers';
import { C, R } from '@/theme/leanr';
import { Button } from '@/ui/Button';
import { Glass } from '@/ui/Glass';
import { Icon } from '@/ui/Icon';
import { BackButton } from '@/ui/bits';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Txt';

export default function Onboarding() {
  const { answers, setAnswers } = useAnswers();
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUESTIONS[i];
  const val = answers[q.id];

  const set = (patch: Answers) => setAnswers({ ...answers, ...patch });
  const answered = q.type === 'number' ? true : q.type === 'multi' ? Array.isArray(val) && val.length > 0 : !!val;
  const isLast = i === QUESTIONS.length - 1;

  const pick = (id: string) => {
    if (q.type === 'multi') {
      let cur = Array.isArray(val) ? [...val] : [];
      if (id === 'none') cur = cur.includes('none') ? [] : ['none'];
      else {
        cur = cur.filter((x) => x !== 'none');
        cur = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      }
      set({ [q.id]: cur });
    } else set({ [q.id]: id });
  };
  const bump = (d: number) => {
    if (q.type !== 'number') return;
    const cur = Number(val ?? q.min);
    set({ [q.id]: Math.min(q.max, Math.max(q.min, cur + d)) });
  };
  const next = () => (isLast ? setDone(true) : setI(i + 1));
  const back = () => (i === 0 ? router.back() : setI(i - 1));

  if (done) return <Result answers={answers} onEdit={() => { setDone(false); setI(0); }} />;

  const footer = <Button label={isLast ? 'Build my plan' : 'Continue'} iconAfter="arrowR" disabled={!answered} kind={answered ? 'primary' : 'glass'} onPress={next} />;

  return (
    <Screen orbs="b" bottomSpace={120} footer={footer}>
      <View style={styles.header}>
        <BackButton onPress={back} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Txt v="tiny" color={C.yellow}>{q.section}</Txt>
          <Txt v="bodyBold">Question {i + 1} of {QUESTIONS.length}</Txt>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.progress} accessibilityElementsHidden>
        {QUESTIONS.map((_, k) => (
          <View key={k} style={[styles.seg, { backgroundColor: k <= i ? C.yellow : C.track }]} />
        ))}
      </View>

      <View style={{ gap: 8, marginTop: 6 }}>
        <Txt v="question" accessibilityRole="header">{q.title}</Txt>
        <Txt v="body" color={C.text2}>{q.sub}</Txt>
      </View>

      {q.type === 'number' ? (
        <NumberPicker value={Number(val ?? q.min)} unit={q.unit} onBump={bump} hint={numberHint(q.id, answers)} />
      ) : (
        <View style={q.type === 'multi' ? styles.grid : { gap: 10 }}>
          {q.options.map((op) => {
            const on = q.type === 'multi' ? Array.isArray(val) && val.includes(op.id) : val === op.id;
            return (
              <Pressable
                key={op.id}
                accessibilityRole={q.type === 'multi' ? 'checkbox' : 'radio'}
                accessibilityState={{ checked: on }}
                onPress={() => pick(op.id)}
                style={q.type === 'multi' ? { width: '48.5%' } : undefined}>
                <Glass variant={on ? 'y' : 'g'} radius={18} style={[styles.option, on && { borderColor: C.yellow, borderWidth: 1.5 }]}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt v="bodyL">{op.label}</Txt>
                    {op.desc ? <Txt v="bodyS" color={C.text2}>{op.desc}</Txt> : null}
                  </View>
                  <View style={[styles.mark, { borderRadius: q.type === 'multi' ? 7 : R.pill }, on && { backgroundColor: C.yellow, borderColor: C.yellow }]}>
                    {on ? <Icon name="check" size={14} color={C.onBrand} stroke={3} /> : null}
                  </View>
                </Glass>
              </Pressable>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

function numberHint(id: string, a: Answers) {
  if (id === 'height') return 'Tip: measure without shoes, standing against a wall.';
  if (id === 'weight') return 'Weigh yourself in the morning for the most consistent number.';
  const diff = Number(a.weight ?? 72) - Number(a.target ?? 66);
  if (diff > 0) return `That's ${diff} kg to lose. A steady 0.5–1 kg a week is a healthy pace.`;
  if (diff < 0) return `That's ${-diff} kg to gain. Your plan will add lean muscle gradually.`;
  return "Same as today — we'll focus on staying strong and fit.";
}

function NumberPicker({ value, unit, onBump, hint }: { value: number; unit: string; onBump: (d: number) => void; hint: string }) {
  const ticks = Array.from({ length: 25 }, (_, k) => value - 12 + k);
  return (
    <View style={{ gap: 14, marginTop: 8 }}>
      <Glass radius={26} style={{ paddingVertical: 24, paddingHorizontal: 18, alignItems: 'center', gap: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }} accessibilityLiveRegion="polite">
          <Txt v="numberXL" style={{ fontSize: 76, lineHeight: 80 }}>{value}</Txt>
          <Txt v="numberM" color={C.yellow} style={{ fontSize: 22, marginBottom: 12 }}>{unit}</Txt>
        </View>
        <View style={styles.ruler} accessibilityElementsHidden>
          {ticks.map((t) => {
            const cur = t === value;
            const major = t % 5 === 0;
            return (
              <View key={t} style={{ alignItems: 'center', width: 8, gap: 6 }}>
                <View style={{ width: cur ? 4 : 2, height: cur ? 40 : major ? 26 : 14, borderRadius: 2, backgroundColor: cur ? C.yellow : major ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.22)' }} />
                <Txt v="caption" color={C.text3} style={{ fontSize: 10, width: 30, textAlign: 'center' }}>{major && !cur ? String(t) : ' '}</Txt>
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22 }}>
          <StepBtn icon="minus" label={`Decrease ${unit}`} onPress={() => onBump(-1)} />
          <Txt v="captionBold" color={C.text2}>Tap to adjust</Txt>
          <StepBtn icon="plus" label={`Increase ${unit}`} onPress={() => onBump(1)} />
        </View>
      </Glass>
      <Glass variant="y" radius={16} style={{ padding: 14 }}>
        <Txt v="bodyS" style={{ fontFamily: 'Manrope_600SemiBold' }}>{hint}</Txt>
      </Glass>
    </View>
  );
}

function StepBtn({ icon, label, onPress }: { icon: 'plus' | 'minus'; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}>
      <Glass radius={R.pill} style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={26} stroke={2.2} />
      </Glass>
    </Pressable>
  );
}

function Result({ answers, onEdit }: { answers: Answers; onEdit: () => void }) {
  const p = planFromAnswers(answers);
  const likes = (Array.isArray(answers.likes) ? answers.likes : []).map((id) => labelFor('likes', id)).slice(0, 3);
  const rows: [string, string, boolean?][] = [
    ['Daily calories', `${p.kcal.toLocaleString('en-IN')} kcal`, true],
    ['Protein target', `${p.protein} g a day`],
    ['Weight goal', `${p.weight} → ${p.target} kg`],
    ['Training', answers.days ? `${labelFor('days', String(answers.days))} a week` : '3–4 days a week'],
    ['Classes for you', likes.length ? likes.join(', ') : 'Yoga, HIIT'],
  ];
  return (
    <Screen scroll={false} orbs="c" contentStyle={{ paddingTop: 80 }}>
      <View style={styles.doneBadge}><Icon name="check" size={36} color={C.onBrand} stroke={2.6} /></View>
      <View style={{ gap: 8 }}>
        <Txt v="label" color={C.yellow}>15 of 15 answered</Txt>
        <Txt v="displayL">Your plan{'\n'}is ready.</Txt>
        <Txt v="body" color={C.text2}>Built from your answers. You can change it anytime.</Txt>
      </View>
      <Glass radius={24} style={{ paddingHorizontal: 18, paddingVertical: 6 }}>
        {rows.map(([k, v, hi], idx) => (
          <View key={k} style={[styles.resRow, idx < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.divider }]}>
            <Txt v="body" color={C.text2}>{k}</Txt>
            <Txt v={hi ? 'numberM' : 'bodyBold'} color={hi ? C.yellow : C.text} style={{ flexShrink: 1, textAlign: 'right' }}>{v}</Txt>
          </View>
        ))}
      </Glass>
      <View style={{ flex: 1 }} />
      <Button label="See my plan" iconAfter="arrowR" onPress={() => router.push('/plans')} />
      <Button label="Edit my answers" kind="glass" size="md" onPress={onEdit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progress: { flexDirection: 'row', gap: 4 },
  seg: { flex: 1, height: 5, borderRadius: 3 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  option: { minHeight: 60, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  mark: { width: 24, height: 24, borderWidth: 2, borderColor: 'rgba(255,255,255,0.35)', alignItems: 'center', justifyContent: 'center' },
  ruler: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 60 },
  doneBadge: { width: 72, height: 72, borderRadius: 24, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' },
  resRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, gap: 16 },
});
