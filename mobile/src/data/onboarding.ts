export type Option = { id: string; label: string; desc?: string };

export type Question =
  | { id: string; section: string; type: 'single' | 'multi'; title: string; sub: string; options: Option[] }
  | { id: string; section: string; type: 'number'; title: string; sub: string; unit: string; min: number; max: number };

const o = (id: string, label: string, desc?: string): Option => ({ id, label, desc });

export const QUESTIONS: Question[] = [
  { id: 'goal', section: 'Your goal', type: 'single', title: "What's your main goal?", sub: "We'll build your diet, classes and AI workouts around it.",
    options: [o('lose', 'Lose fat', 'Drop weight and feel lighter'), o('muscle', 'Build muscle', 'Get stronger, add lean mass'), o('fit', 'Get fit & active', 'More energy and stamina'), o('flex', 'Improve flexibility', 'Move freely, ease stiffness'), o('health', 'Manage a condition', 'PCOS, thyroid, diabetes and more')] },
  { id: 'gender', section: 'About you', type: 'single', title: 'How do you identify?', sub: 'Helps us set an accurate calorie target.',
    options: [o('f', 'Female'), o('m', 'Male'), o('nb', 'Non-binary'), o('na', 'Prefer not to say')] },
  { id: 'age', section: 'About you', type: 'single', title: 'How old are you?', sub: 'Your age changes how many calories you burn.',
    options: [o('18', '18–24'), o('25', '25–34'), o('35', '35–44'), o('45', '45–54'), o('55', '55 or older')] },
  { id: 'height', section: 'Your body', type: 'number', title: 'How tall are you?', sub: 'Used to work out your daily calorie needs.', unit: 'cm', min: 120, max: 220 },
  { id: 'weight', section: 'Your body', type: 'number', title: "What's your current weight?", sub: 'Only you and your coach can see this.', unit: 'kg', min: 30, max: 200 },
  { id: 'target', section: 'Your body', type: 'number', title: "What's your target weight?", sub: 'Pick a number that feels doable — you can change it later.', unit: 'kg', min: 30, max: 200 },
  { id: 'activity', section: 'Your routine', type: 'single', title: 'How active is a normal day?', sub: 'Not counting workouts.',
    options: [o('sit', 'Mostly sitting', 'Desk job, little walking'), o('light', 'Lightly active', 'Some walking, light chores'), o('active', 'Active', 'On my feet most of the day'), o('very', 'Very active', 'Physical job or daily sport')] },
  { id: 'exp', section: 'Your routine', type: 'single', title: 'How much have you trained before?', sub: 'So workouts are pitched at the right level.',
    options: [o('beg', 'Beginner', 'New, or getting back into it'), o('int', 'Intermediate', 'I train a few times a week'), o('adv', 'Advanced', 'Training seriously for 2+ years')] },
  { id: 'likes', section: 'Your routine', type: 'multi', title: 'Which workouts do you enjoy?', sub: "Pick as many as you like — we'll suggest classes.",
    options: [o('yoga', 'Yoga'), o('strength', 'Strength'), o('hiit', 'HIIT'), o('zumba', 'Zumba & dance'), o('pilates', 'Pilates'), o('run', 'Running'), o('meditate', 'Meditation')] },
  { id: 'diet', section: 'Food', type: 'single', title: 'How do you eat?', sub: 'Every meal in your plan will match this.',
    options: [o('veg', 'Vegetarian'), o('nonveg', 'Non-vegetarian'), o('egg', 'Eggetarian'), o('vegan', 'Vegan'), o('jain', 'Jain')] },
  { id: 'allergy', section: 'Food', type: 'multi', title: 'Any food allergies or intolerances?', sub: "We'll keep these out of your meals.",
    options: [o('none', 'None'), o('lactose', 'Lactose'), o('gluten', 'Gluten'), o('nuts', 'Nuts'), o('soy', 'Soy'), o('seafood', 'Seafood')] },
  { id: 'meals', section: 'Food', type: 'single', title: 'How many meals do you eat a day?', sub: 'Snacks count too.',
    options: [o('2', '2 meals'), o('3', '3 meals'), o('4', '4 meals'), o('5', '5 or more')] },
  { id: 'health', section: 'Health', type: 'multi', title: 'Any health conditions we should know about?', sub: 'Shared only with your coach.',
    options: [o('none', 'None'), o('pcos', 'PCOS / PCOD'), o('thyroid', 'Thyroid'), o('diabetes', 'Diabetes'), o('bp', 'Blood pressure'), o('joints', 'Joint or back pain')] },
  { id: 'sleep', section: 'Lifestyle', type: 'single', title: 'How much do you usually sleep?', sub: 'Sleep affects hunger, recovery and energy.',
    options: [o('5', 'Under 5 hours'), o('6', '5–6 hours'), o('7', '7–8 hours'), o('9', 'More than 8 hours')] },
  { id: 'days', section: 'Lifestyle', type: 'single', title: 'How many days a week can you train?', sub: 'Be honest — consistency beats intensity.',
    options: [o('2', '1–2 days'), o('4', '3–4 days'), o('6', '5–6 days'), o('7', 'Every day')] },
];

export type Answers = Record<string, string | string[] | number | undefined>;

export const DEFAULT_ANSWERS: Answers = { height: 170, weight: 72, target: 66 };

/** Mifflin–St Jeor estimate, adjusted for activity and goal. A starting point, not medical advice. */
export function planFromAnswers(a: Answers) {
  const weight = Number(a.weight ?? 72);
  const height = Number(a.height ?? 170);
  const ageMid: Record<string, number> = { '18': 21, '25': 29, '35': 39, '45': 49, '55': 60 };
  const age = ageMid[String(a.age)] ?? 29;
  const sexAdj = a.gender === 'f' ? -161 : a.gender === 'm' ? 5 : -78;
  const bmr = 10 * weight + 6.25 * height - 5 * age + sexAdj;
  const mult: Record<string, number> = { sit: 1.2, light: 1.375, active: 1.55, very: 1.725 };
  const adj: Record<string, number> = { lose: -500, muscle: 300, fit: 0, flex: 0, health: -250 };
  const kcal = Math.max(1200, Math.round((bmr * (mult[String(a.activity)] ?? 1.375) + (adj[String(a.goal)] ?? 0)) / 50) * 50);
  const protein = Math.round(weight * (a.goal === 'muscle' ? 2 : 1.6));
  return { kcal, protein, weight, target: Number(a.target ?? 66) };
}

export function labelFor(qid: string, id: string | undefined) {
  const q = QUESTIONS.find((x) => x.id === qid);
  if (!q || q.type === 'number' || !id) return '';
  return q.options.find((x) => x.id === id)?.label ?? '';
}
