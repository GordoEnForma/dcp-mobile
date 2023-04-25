import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './AppNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

interface TabScreenConfig {
  name: string;
  component: React.ComponentType<any>;
  label: string;
  icon: (props: {focused: boolean; color: string; size: number}) => JSX.Element;
}

interface TabScreenWrapperProps {
  tabScreenConfigs: TabScreenConfig[];
}

export const TabScreenWrapper: React.FC<TabScreenWrapperProps> = ({
  tabScreenConfigs,
}) => {
  return (
    <Tab.Navigator>
      {tabScreenConfigs.map((config, index) => (
        <Tab.Screen
          key={index}
          name={config.name}
          component={config.component}
          options={{
            tabBarLabel: config.label,
            tabBarIcon: config.icon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
