import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { C, F, R } from '@/theme/leanr';
import { Button } from '@/ui/Button';
import { Glass } from '@/ui/Glass';
import { Icon } from '@/ui/Icon';
import { BackButton, Logo } from '@/ui/bits';
import { Screen } from '@/ui/Screen';
import { Txt } from '@/ui/Txt';

type Mode = 'signup' | 'login';

export default function SignUp() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const [mode, setMode] = useState<Mode>(params.mode === 'login' ? 'login' : 'signup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const digits = phone.replace(/\D/g, '');
  const valid = digits.length === 10 && (mode === 'login' || name.trim().length > 1);

  const sendCode = () => router.push({ pathname: '/verify', params: { phone: digits, mode } });

  return (
    <Screen orbs="b">
      <View style={styles.header}>
        <BackButton />
        <Logo width={92} />
        <View style={{ width: 44 }} />
      </View>

      <View style={{ gap: 8, marginTop: 6 }}>
        <Txt v="displayL">{mode === 'signup' ? 'Create your\naccount' : 'Welcome\nback'}</Txt>
        <Txt v="body" color={C.text2}>
          {mode === 'signup'
            ? 'Join Leanr for your personal diet, live classes and an AI coach.'
            : 'Log in with the mobile number you signed up with.'}
        </Txt>
      </View>

      <Glass radius={16} style={styles.segment}>
        {(['signup', 'login'] as const).map((m) => {
          const on = mode === m;
          return (
            <Pressable
              key={m}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => setMode(m)}
              style={[styles.segBtn, on && { backgroundColor: C.yellow }]}>
              <Txt v="bodyBold" color={on ? C.onBrand : C.text}>{m === 'signup' ? 'Sign up' : 'Log in'}</Txt>
            </Pressable>
          );
        })}
      </Glass>

      <Glass radius={24} style={{ padding: 16, gap: 14 }}>
        {mode === 'signup' ? (
          <View style={{ gap: 8 }}>
            <Txt v="captionBold">Full name</Txt>
            <View style={styles.input}>
              <Icon name="user" size={18} opacity={0.6} />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={C.text3}
                autoComplete="name"
                style={styles.inputText}
                accessibilityLabel="Full name"
              />
            </View>
          </View>
        ) : null}
        <View style={{ gap: 8 }}>
          <Txt v="captionBold">Mobile number</Txt>
          <View style={[styles.input, { paddingLeft: 6 }]}>
            <Glass variant="y" radius={10} style={styles.cc}>
              <Txt v="numberS" color={C.yellow}>+91</Txt>
            </Glass>
            <TextInput
              value={phone}
              onChangeText={(t) => setPhone(t.replace(/[^\d ]/g, '').slice(0, 11))}
              placeholder="10-digit number"
              placeholderTextColor={C.text3}
              keyboardType="phone-pad"
              autoComplete="tel"
              style={[styles.inputText, { fontFamily: F.number, fontSize: 17 }]}
              accessibilityLabel="Mobile number"
            />
          </View>
          <Txt v="caption" color={C.text2}>We’ll text you a 6-digit code. No password needed.</Txt>
        </View>
      </Glass>

      <Button label="Send code" iconAfter="arrowR" disabled={!valid} kind={valid ? 'primary' : 'glass'} onPress={sendCode} />

      <Txt v="caption" color={C.text3} center>
        By continuing you agree to Leanr’s{' '}<Txt v="captionBold" color={C.yellow}>Terms</Txt> and{' '}
        <Txt v="captionBold" color={C.yellow}>Privacy Policy</Txt>.
      </Txt>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  segment: { flexDirection: 'row', padding: 4, gap: 4 },
  segBtn: { flex: 1, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.glassLine,
    backgroundColor: C.glass,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
  },
  inputText: { flex: 1, color: C.text, fontFamily: F.xbold, fontSize: 16, paddingVertical: 0 },
  cc: { height: 40, paddingHorizontal: 10, justifyContent: 'center', borderRadius: R.sm },
});
