import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {
  HomeScreen,
  UserScreen,
  InformationScreen,
  DiagnosisScreen,
  DiagnosisDetailScreen,
  SignInScreen,
} from '../screens';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../hooks/useAuth';
import {TabScreenWrapper} from './TabScreenWrapper';

export interface RootStackParamList extends ParamListBase {
  DiagnosisTack: undefined;
  DiagnosisDetailPage: {diagnosisId: string};
}

export interface RootTabParamList extends ParamListBase {
  Home: undefined;
  Diagnosis: undefined;
  Information: undefined;
  User: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

const DiagnosisStack = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen
      name="DiagnosisList"
      component={DiagnosisScreen}
      options={{
        headerTitle: 'Diagnosticos',
      }}
    />
    <Stack.Screen
      name="DiagnosisDetailPage"
      component={DiagnosisDetailScreen}
      options={{
        headerTitle: 'Detalle de Diagnóstico',
        headerBackTitle: 'Diagnósticos',
      }}
    />
  </Stack.Navigator>
);

const tabScreenConfigs = [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Inicio',
    icon: (props: {focused: boolean; color: string; size: number}) => (
      <MaterialCommunityIcon
        name="home"
        {...props}
        color={props.focused ? 'blue' : 'black'}
      />
    ),
  },
  {
    name: 'Diagnosticos',
    component: DiagnosisStack,
    label: 'Diagnósticos',
    icon: (props: {focused: boolean; color: string; size: number}) => (
      <MaterialCommunityIcon
        name="view-list"
        {...props}
        color={props.focused ? 'blue' : 'black'}
      />
    ),
  },
  {
    name: 'Information',
    component: InformationScreen,
    label: 'Información',
    icon: (props: {focused: boolean; color: string; size: number}) => (
      <MaterialCommunityIcon
        name="search"
        {...props}
        color={props.focused ? 'blue' : 'black'}
      />
    ),
  },
  {
    name: 'User',
    component: UserScreen,
    label: 'Configuración',
    icon: (props: {focused: boolean; color: string; size: number}) => (
      <MaterialCommunityIcon
        name="settings"
        {...props}
        color={props.focused ? 'blue' : 'black'}
      />
    ),
  },
];
const AppNavigator = () => {
  const {data: user, isLoading} = useAuth();
  console.log(user?.email);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return <TabScreenWrapper tabScreenConfigs={tabScreenConfigs} />;
};

export default AppNavigator;
