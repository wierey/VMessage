import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../styles/theme';

type Props = {
  onBack: () => void;
};

type Notification = {
  id: number;
  name: string;
  message: string;
  time: string;
  icon: string;
  color: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    message: 'liked your post.',
    time: '2 minutes ago',
    icon: '❤️',
    color: '#FFE8EC',
    read: false,
  },
  {
    id: 2,
    name: 'Maria Santos',
    message: 'started following you.',
    time: '15 minutes ago',
    icon: '👤',
    color: '#EAF3FF',
    read: false,
  },
  {
    id: 3,
    name: 'John Smith',
    message: 'commented: Beautiful photo!',
    time: '1 hour ago',
    icon: '💬',
    color: '#E8F8EF',
    read: false,
  },
  {
    id: 4,
    name: 'Sophia Lee',
    message: 'sent you a message.',
    time: '3 hours ago',
    icon: '✉️',
    color: '#F1EAFE',
    read: true,
  },
  {
    id: 5,
    name: 'Alex Morgan',
    message: 'mentioned you in a post.',
    time: 'Yesterday',
    icon: '🔔',
    color: '#FFF3DF',
    read: true,
  },
];

export default function NotificationsScreen({ onBack }: Props) {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    item => !item.read
  ).length;

  const markAllRead = () => {
    setNotifications(previous =>
      previous.map(item => ({ ...item, read: true }))
    );
  };

  const markRead = (id: number) => {
    setNotifications(previous =>
      previous.map(item =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <View style={styles.titleArea}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>
            {unreadCount} unread notifications
          </Text>
        </View>

        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markAll}>Read all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.todayHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>

        {notifications.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.notification,
              !item.read && styles.unreadNotification,
            ]}
            onPress={() => markRead(item.id)}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.color },
              ]}
            >
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            You're all caught up! 🎉
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  header: {
    height: 75,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  back: {
    fontSize: 38,
    color: COLORS.primary,
    width: 38,
  },
  titleArea: {
    flex: 1,
    marginLeft: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 3,
  },
  markAll: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  todayHeader: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  unreadNotification: {
    backgroundColor: '#EDF5FF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 21,
  },
  details: {
    flex: 1,
    marginLeft: 13,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  message: {
    fontSize: 13,
    color: COLORS.text,
    marginTop: 4,
  },
  time: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 5,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 13,
  },
});