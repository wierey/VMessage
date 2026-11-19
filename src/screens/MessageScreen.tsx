
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { COLORS } from '../styles/theme';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
};

type Contact = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  color: string;
  lastMessage: string;
  time: string;
  messages: Message[];
};

type Props = {
  userName: string;
  onBack: () => void;
};

const initialContacts: Contact[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    username: '@alexmorgan',
    avatar: 'A',
    color: '#1877F2',
    lastMessage: 'Hey! How are you?',
    time: '10:30 AM',
    messages: [
      { id: 1, text: 'Hello! 👋', sender: 'them', time: '10:25 AM' },
      { id: 2, text: 'Hi Alex!', sender: 'me', time: '10:27 AM' },
      { id: 3, text: 'Hey! How are you?', sender: 'them', time: '10:30 AM' },
    ],
  },
  {
    id: 2,
    name: 'Maria Santos',
    username: '@maria',
    avatar: 'M',
    color: '#E84393',
    lastMessage: 'See you tomorrow!',
    time: '9:15 AM',
    messages: [
      { id: 1, text: 'Are you free tomorrow?', sender: 'them', time: '9:10 AM' },
      { id: 2, text: 'Yes, I am!', sender: 'me', time: '9:12 AM' },
      { id: 3, text: 'See you tomorrow!', sender: 'them', time: '9:15 AM' },
    ],
  },
  {
    id: 3,
    name: 'John Smith',
    username: '@johnsmith',
    avatar: 'J',
    color: '#20BF6B',
    lastMessage: 'Thank you!',
    time: 'Yesterday',
    messages: [
      { id: 1, text: 'Thanks for your help!', sender: 'them', time: 'Yesterday' },
    ],
  },
  {
    id: 4,
    name: 'Sophia Lee',
    username: '@sophia',
    avatar: 'S',
    color: '#8854D0',
    lastMessage: 'Good morning ☀️',
    time: 'Yesterday',
    messages: [
      { id: 1, text: 'Good morning ☀️', sender: 'them', time: 'Yesterday' },
    ],
  },
];

export default function MessagesScreen({ userName, onBack }: Props) {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedContacts = contacts.map(contact =>
      contact.id === selectedContact.id
        ? {
            ...contact,
            lastMessage: newMessage.text,
            time: newMessage.time,
            messages: [...contact.messages, newMessage],
          }
        : contact
    );

    setContacts(updatedContacts);
    setSelectedContact(
      updatedContacts.find(c => c.id === selectedContact.id) || null
    );
    setMessage('');
  };

  const openChat = (contact: Contact) => {
    setSelectedContact(contact);
  };

  // CHAT CONVERSATION
  if (selectedContact) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedContact(null)}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={[
            styles.avatar,
            { backgroundColor: selectedContact.color },
          ]}>
            <Text style={styles.avatarText}>
              {selectedContact.avatar}
            </Text>
          </View>

          <View style={styles.chatHeaderInfo}>
            <Text style={styles.contactName}>
              {selectedContact.name}
            </Text>
            <Text style={styles.onlineText}>VMessage contact</Text>
          </View>

          <Text style={styles.headerIcon}>•••</Text>
        </View>

        <ScrollView
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          ref={ref => {
            if (ref) {
              setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
            }
          }}
        >
          <Text style={styles.chatDate}>Conversation</Text>

          {selectedContact.messages.map(item => (
            <View
              key={item.id}
              style={[
                styles.messageRow,
                item.sender === 'me' && styles.myMessageRow,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  item.sender === 'me'
                    ? styles.myBubble
                    : styles.theirBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.sender === 'me' && styles.myMessageText,
                  ]}
                >
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    item.sender === 'me' && styles.myMessageTime,
                  ]}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.gray}
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // MESSAGES INBOX
  return (
    <View style={styles.container}>
      <View style={styles.inboxHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.inboxTitle}>Messages</Text>

        <Text style={styles.headerIcon}>✎</Text>
      </View>

      <View style={styles.welcomeArea}>
        <Text style={styles.welcomeText}>Hello, {userName}!</Text>
        <Text style={styles.subtitle}>Stay connected with your friends.</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>Recent Conversations</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredContacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactItem}
            onPress={() => openChat(contact)}
          >
            <View style={[
              styles.avatar,
              { backgroundColor: contact.color },
            ]}>
              <Text style={styles.avatarText}>{contact.avatar}</Text>
            </View>

            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {contact.lastMessage}
              </Text>
            </View>

            <Text style={styles.contactTime}>{contact.time}</Text>
          </TouchableOpacity>
        ))}

        {filteredContacts.length === 0 && (
          <Text style={styles.emptyText}>No conversations found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  inboxHeader: {
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAF0F6',
  },
  inboxTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  backIcon: {
    fontSize: 38,
    color: COLORS.primary,
    width: 35,
  },
  headerIcon: {
    fontSize: 24,
    color: COLORS.primary,
  },
  welcomeArea: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.gray,
    marginTop: 5,
    fontSize: 13,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 25,
    color: COLORS.primary,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  lastMessage: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },
  contactTime: {
    fontSize: 11,
    color: COLORS.gray,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 35,
  },
  chatHeader: {
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  onlineText: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 3,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 15,
  },
  chatContent: {
    paddingVertical: 20,
  },
  chatDate: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 12,
    marginBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  theirBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 3,
  },
  myBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 3,
  },
  messageText: {
    color: COLORS.text,
    fontSize: 15,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 6,
    textAlign: 'right',
  },
  myMessageTime: {
    color: '#DCEAFF',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  messageInput: {
    flex: 1,
    minHeight: 45,
    maxHeight: 100,
    borderRadius: 22,
    backgroundColor: '#F1F4F8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: COLORS.text,
  },
  sendButton: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 9,
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 21,
  },
});