import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { C } from '@/theme/leanr';
import { Button } from '@/ui/Button';
import { Glass } from '@/ui/Glass';
import { Icon } from '@/ui/Icon';
import { BackButton, Pill } from '@/ui/bits';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Txt';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];

export default function Verify() {
  const { phone = '9876543210', mode = 'signup' } = useLocalSearchParams<{ phone?: string; mode?: string }>();
  const [code, setCode] = useState('');
  const [secs, setSecs] = useState(30);

  useEffect(() => {
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  const press = (k: string) => {
    if (k === 'back') setCode((c) => c.slice(0, -1));
    else if (k) setCode((c) => (c.length < 6 ? c + k : c));
  };
  const complete = code.length === 6;
  const pretty = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

  const verify = () => {
    // TODO: verify the OTP with the auth backend.
    if (mode === 'login') router.replace('/home');
    else router.replace('/onboarding');
  };

  return (
    <Screen scroll={false} orbs="a">
      <View style={styles.header}>
        <BackButton />
        <Pill label={mode === 'login' ? 'Log in' : 'Step 2 of 3'} kind="y" />
      </View>

      <View style={{ gap: 8, marginTop: 4 }}>
        <Txt v="displayL">Enter the{'\n'}6-digit code</Txt>
        <Txt v="bodyS" color={C.text2}>
          Sent by SMS to <Txt v="bodyBold">{pretty}</Txt>
        </Txt>
      </View>

      <View style={styles.boxes} accessible accessibilityLabel={`${code.length} of 6 digits entered`}>
        {Array.from({ length: 6 }).map((_, i) => {
          const filled = i < code.length;
          const active = i === code.length;
          return (
            <Glass key={i} variant={filled || active ? 'y' : 'g'} radius={16} style={[styles.box, active && { borderColor: C.yellow, borderWidth: 1.5 }]}>
              {filled ? <Txt v="numberL">{code[i]}</Txt> : active ? <View style={styles.caret} /> : null}
            </Glass>
          );
        })}
      </View>

      <View style={styles.resend}>
        <Txt v="bodyS" color={C.text2}>Didn’t get it?</Txt>
        {secs > 0 ? (
          <Txt v="bodyS" color={C.text2}>
            Resend in <Txt v="numberS">0:{String(secs).padStart(2, '0')}</Txt>
          </Txt>
        ) : (
          <Pressable onPress={() => { setSecs(30); setCode(''); }} accessibilityRole="button" hitSlop={8}>
            <Txt v="bodyBold" color={C.yellow}>Resend code</Txt>
          </Pressable>
        )}
      </View>

      <Button label="Verify & continue" iconAfter="arrowR" disabled={!complete} kind={complete ? 'primary' : 'glass'} onPress={verify} />

      <View style={{ flex: 1 }} />

      <View style={styles.pad}>
        {KEYS.map((k, i) =>
          k === '' ? (
            <View key={i} style={styles.key} />
          ) : (
            <Pressable key={i} accessibilityRole="button" accessibilityLabel={k === 'back' ? 'Delete last digit' : `Digit ${k}`} onPress={() => press(k)} style={styles.keyWrap}>
              {k === 'back' ? (
                <View style={styles.keyInner}>
                  <Icon name="backspace" size={26} />
                </View>
              ) : (
                <Glass radius={18} style={styles.keyInner}>
                  <Txt v="numberL">{k}</Txt>
                </Glass>
              )}
            </Pressable>
          ),
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  boxes: { flexDirection: 'row', gap: 8 },
  box: { flex: 1, height: 62, alignItems: 'center', justifyContent: 'center' },
  caret: { width: 2, height: 26, backgroundColor: C.yellow },
  resend: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pad: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  keyWrap: { width: '31.5%' },
  key: { width: '31.5%', height: 58 },
  keyInner: { width: '100%', height: 58, alignItems: 'center', justifyContent: 'center' },
});
