import { router } from 'expo-router';

import { Button } from '@/ui/Button';
import { ComingNext } from '@/ui/ComingNext';

export default function Profile() {
  return (
    <ComingNext
      title="Profile"
      sub="Aarav Mehta · Lean Pro trial"
      icon="user"
      items={['Membership and trial status', 'Weight progress and weekly stats', 'Bookings, payments, reminders and log out']}>
      <Button label="Restart sign-up flow" kind="glass" size="md" icon="chevL" onPress={() => router.replace('/')} />
    </ComingNext>
  );
}
