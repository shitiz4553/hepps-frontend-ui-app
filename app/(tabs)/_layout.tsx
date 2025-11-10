import CustomBottomTab from '@/components/CustomBottomTab';
import { colors } from '@/constants/colors';
import { Tabs } from 'expo-router';
import { Location, Map1, User } from 'iconsax-react-native';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomBottomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="nearby"
        options={{
          title: 'Nearby',
          tabBarIcon: ({ focused }) => (
            <Location size={24} color={colors.white} variant={focused ? 'Bold' : 'Outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name="hangout"
        options={{
          title: 'Hangout',
          tabBarIcon: ({ focused }) => (
            <Map1 size={24} color={colors.white} variant={focused ? 'Bold' : 'Outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: 'You',
          tabBarIcon: ({ focused }) => (
            <User size={24} color={colors.white} variant={focused ? 'Bold' : 'Outline'} />
          ),
        }}
      />
    </Tabs>
  );
}
