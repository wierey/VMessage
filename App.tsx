import React, { useState } from 'react';
import { Alert } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import MessagesScreen from './src/screens/MessageScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import NotificationScreen from './src/screens/NotificationScreen';

type Screen = 'login' | 'register' | 'home' | 'messages' | 'discover' | 'notification';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');

  const handleLogin = (email: string, password: string) => {
    setUserName(email.split('@')[0]);
    setScreen('home');
  };

  const handleRegister = (
    name: string,
    email: string,
    password: string
  ) => {
    setUserName(name);
    Alert.alert('Success', 'Welcome to VMessage!');
    setScreen('home');
  };

  if (screen === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onRegister={() => setScreen('register')}
      />
    );
  }

  if (screen === 'register') {
    return (
      <RegisterScreen
        onRegister={handleRegister}
        onLogin={() => setScreen('login')}
      />
    );
  }

  if (screen === 'messages') {
    return (
      <MessagesScreen
        userName={userName}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'discover') {
  return (
    <DiscoverScreen
      onBack={() => setScreen('home')}
    />
  );
}
 if (screen === 'notification') {
  return (
    <DiscoverScreen
      onBack={() => setScreen('home')}
    />
  );
}

  return (
  <HomeScreen
    userName={userName}
    onMessages={() => setScreen('messages')}
    onDiscover={() => setScreen('discover')}
    onNotifications={() => setScreen('notification')}
    onProfile={() =>
      Alert.alert('Profile', 'Welcome ${userName}!')
    }
  />
);
}