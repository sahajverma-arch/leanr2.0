import type { ReactNode } from 'react';
import { View } from 'react-native';

import { C } from '@/theme/leanr';
import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { Screen } from './Screen';
import { Txt } from './Txt';

type Props = { title: string; sub: string; icon: IconName; items: string[]; children?: ReactNode };

// Temporary screen for tabs that are designed but not built yet.
export function ComingNext({ title, sub, icon, items, children }: Props) {
  return (
    <Screen orbs="a" bottomSpace={120}>
      <View style={{ gap: 4 }}>
        <Txt v="displayM">{title}</Txt>
        <Txt v="bodyS" color={C.text2}>{sub}</Txt>
      </View>
      <Glass variant="y" radius={24} style={{ padding: 18, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Icon name={icon} size={22} color={C.yellow} />
          <Txt v="label" color={C.yellow}>Coming in the next build</Txt>
        </View>
        {items.map((it) => (
          <View key={it} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <Icon name="check" size={16} color={C.yellow} stroke={2.6} />
            <Txt v="bodyS" style={{ flex: 1 }}>{it}</Txt>
          </View>
        ))}
      </Glass>
      {children}
    </Screen>
  );
}
