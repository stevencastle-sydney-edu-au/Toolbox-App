export const recentActivities = [
  {
    id: '1',
    title: 'Breakfast',
    time: '8:30 AM',
    type: 'food',
    description: 'Oatmeal with berries and a cup of green tea',
    date: '2025-05-02',
  },
  {
    id: '2',
    title: 'Feeling anxious about dinner party',
    time: '10:15 AM',
    type: 'thought',
    description: 'I\'m worried about the food options at tonight\'s dinner party and if I\'ll be able to maintain my meal plan.',
    date: '2025-05-02',
  },
  {
    id: '3',
    title: 'Lunch',
    time: '12:30 PM',
    type: 'food',
    description: 'Chicken salad with mixed greens and olive oil dressing',
    date: '2025-05-02',
  },
  {
    id: '4',
    title: 'Practiced mindful eating',
    time: '12:45 PM',
    type: 'check',
    description: 'Took time to eat slowly and notice flavors and textures',
    date: '2025-05-02',
  },
  {
    id: '5',
    title: 'Afternoon snack',
    time: '3:00 PM',
    type: 'food',
    description: 'Apple with almond butter',
    date: '2025-05-02',
  },
  {
    id: '6',
    title: 'Planned meals for tomorrow',
    time: '4:30 PM',
    type: 'meal-plan',
    description: 'Created balanced meal plan for the next day',
    date: '2025-05-02',
  },
  {
    id: '7',
    title: 'Practiced positive self-talk',
    time: '5:15 PM',
    type: 'goal',
    description: 'Countered negative thoughts with compassionate statements',
    date: '2025-05-01',
  },
  {
    id: '8',
    title: 'Dinner',
    time: '7:00 PM',
    type: 'food',
    description: 'Salmon with roasted vegetables and quinoa',
    date: '2025-05-01',
  },
];

export const upcomingItems = [
  {
    id: '1',
    title: 'Breakfast - Yogurt with granola',
    date: 'May 3, 2025',
    time: '8:00 AM',
    type: 'meal',
  },
  {
    id: '2',
    title: 'Try a new food: Avocado toast',
    date: 'May 3, 2025',
    time: '12:30 PM',
    type: 'goal',
  },
  {
    id: '3',
    title: 'Mindful eating check-in',
    date: 'May 3, 2025',
    time: '6:00 PM',
    type: 'check',
  },
  {
    id: '4',
    title: 'Restaurant meal exposure',
    date: 'May 4, 2025',
    time: '7:00 PM',
    type: 'goal',
  },
];

export const progressStats = {
  daysActive: 14,
  entriesLogged: 78,
  goalsCompleted: 8,
  streak: 5,
};

export const mealPlans = [
  {
    id: '1',
    day: 'Monday',
    date: 'May 5, 2025',
    meals: [
      {
        id: '1-1',
        time: '8:00 AM',
        title: 'Breakfast',
        description: 'Oatmeal with berries and nuts',
      },
      {
        id: '1-2',
        time: '10:30 AM',
        title: 'Morning Snack',
        description: 'Apple and string cheese',
      },
      {
        id: '1-3',
        time: '12:30 PM',
        title: 'Lunch',
        description: 'Turkey sandwich with vegetables',
      },
      {
        id: '1-4',
        time: '3:30 PM',
        title: 'Afternoon Snack',
        description: 'Greek yogurt with honey',
      },
      {
        id: '1-5',
        time: '6:30 PM',
        title: 'Dinner',
        description: 'Grilled chicken, sweet potato, and broccoli',
      },
    ],
  },
  {
    id: '2',
    day: 'Tuesday',
    date: 'May 6, 2025',
    meals: [
      {
        id: '2-1',
        time: '8:00 AM',
        title: 'Breakfast',
        description: 'Scrambled eggs with toast',
      },
      {
        id: '2-2',
        time: '10:30 AM',
        title: 'Morning Snack',
        description: 'Banana and handful of almonds',
      },
      {
        id: '2-3',
        time: '12:30 PM',
        title: 'Lunch',
        description: 'Tuna salad with whole grain crackers',
      },
      {
        id: '2-4',
        time: '3:30 PM',
        title: 'Afternoon Snack',
        description: 'Hummus with carrot sticks',
      },
      {
        id: '2-5',
        time: '6:30 PM',
        title: 'Dinner',
        description: 'Vegetable stir-fry with tofu and brown rice',
      },
    ],
  },
];

export const thoughtLogs = [
  {
    id: '1',
    date: 'May 2, 2025',
    time: '10:15 AM',
    situation: 'Received invitation to dinner party',
    automaticThought: 'I won\'t be able to control my eating at the party.',
    emotionIntensity: 8,
    emotions: ['Anxiety', 'Fear', 'Worry'],
    distortionTypes: ['Catastrophizing', 'Fortune Telling'],
    rationalResponse: 'I have been practicing my skills and have a plan. I can enjoy the social event and still make mindful choices.',
    afterEmotionIntensity: 4,
  },
  {
    id: '2',
    date: 'May 1, 2025',
    time: '3:30 PM',
    situation: 'Saw myself in a mirror',
    automaticThought: 'I look terrible. Everyone must be judging my appearance.',
    emotionIntensity: 9,
    emotions: ['Shame', 'Sadness', 'Disgust'],
    distortionTypes: ['Mind Reading', 'Labeling'],
    rationalResponse: 'My worth isn\'t determined by my appearance. Most people are focused on themselves, not judging me.',
    afterEmotionIntensity: 5,
  },
];

export const goals = [
  {
    id: '1',
    title: 'Try a new food item',
    description: 'Add avocado to my lunch',
    category: 'Food Exposure',
    targetDate: 'May 3, 2025',
    status: 'IN_PROGRESS',
    steps: [
      {
        id: '1-1',
        description: 'Research nutritional benefits of avocados',
        completed: true,
      },
      {
        id: '1-2',
        description: 'Buy an avocado from the grocery store',
        completed: true,
      },
      {
        id: '1-3',
        description: 'Prepare avocado toast for lunch',
        completed: false,
      },
      {
        id: '1-4',
        description: 'Practice mindful eating while trying it',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    title: 'Eat at a restaurant',
    description: 'Go to a local café and order a meal',
    category: 'Social Eating',
    targetDate: 'May 4, 2025',
    status: 'NOT_STARTED',
    steps: [
      {
        id: '2-1',
        description: 'Look at menu online beforehand',
        completed: false,
      },
      {
        id: '2-2',
        description: 'Identify 2-3 meal options that feel comfortable',
        completed: false,
      },
      {
        id: '2-3',
        description: 'Visit restaurant with a supportive friend',
        completed: false,
      },
      {
        id: '2-4',
        description: 'Order and eat a complete meal',
        completed: false,
      },
    ],
  },
  {
    id: '3',
    title: 'Practice body acceptance',
    description: 'Reduce mirror checking behaviors',
    category: 'Body Image',
    targetDate: 'May 10, 2025',
    status: 'IN_PROGRESS',
    steps: [
      {
        id: '3-1',
        description: 'Limit mirror checking to 3 times per day',
        completed: true,
      },
      {
        id: '3-2',
        description: 'Focus on function rather than appearance',
        completed: true,
      },
      {
        id: '3-3',
        description: 'Practice positive affirmations',
        completed: false,
      },
      {
        id: '3-4',
        description: 'Reduce to maximum 2 mirror checks per day',
        completed: false,
      },
    ],
  },
];