import { Tabs } from 'expo-router';
import { useColorScheme, Image, View } from 'react-native';
import { House, Utensils, Calendar, Brain, Target } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          paddingBottom: 16,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
          paddingBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: true,
        headerStyle: {
          height: 100,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerTitle: () => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('@/assets/images/ioilogo.png')}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </View>
        ),
        headerTitleAlign: 'center',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Toolbox',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="food-log"
        options={{
          title: 'Food Journal',
          tabBarLabel: 'Food',
          tabBarIcon: ({ color }) => <Utensils size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="meal-plan"
        options={{
          title: 'Meal Planning',
          tabBarLabel: 'Plan',
          tabBarIcon: ({ color }: { color: string }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="thoughts"
        options={{
          title: 'Thought Log',
          tabBarLabel: 'Thoughts',
          tabBarIcon: ({ color }) => <Brain size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Goals & Exposures',
          tabBarLabel: 'Goals',
          tabBarIcon: ({ color }) => <Target size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}