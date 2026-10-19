import { ComingNext } from '@/ui/ComingNext';

export default function Diets() {
  return (
    <ComingNext
      title="Diet plans"
      sub="Included with your membership"
      icon="leaf"
      items={[
        'Search and filter plans by goal (fat loss, muscle gain, veg, keto, PCOS)',
        'Plan detail with macros and a day-by-day meal preview',
        'Start a plan and see it on Home',
      ]}
    />
  );
}
