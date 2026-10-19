import { Tabs } from 'expo-router/tabs';

import { C } from '@/theme/leanr';
import { LeanrTabBar } from '@/ui/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <LeanrTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: C.bg } }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="diets" />
      <Tabs.Screen name="ai-coach" />
      <Tabs.Screen name="live" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
