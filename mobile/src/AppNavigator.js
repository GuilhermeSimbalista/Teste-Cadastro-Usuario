import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserForm from './UserForm';
import UserList from './UserList';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserForm">
        <Stack.Screen name="UserForm" component={UserForm} options={{ title: 'Cadastro de Usuários' }} />
        <Stack.Screen name="UserList" component={UserList} options={{ title: 'Lista de Usuários' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
