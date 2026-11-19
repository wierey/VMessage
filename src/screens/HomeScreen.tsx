import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import { COLORS } from '../styles/theme';

type Props = {
  userName: string;
  onMessages: () => void;
  onProfile: () => void;
};

const stories = [
  { id: '1', name: 'Your Story', color: '#1877F2', emoji: '+' },
  { id: '2', name: 'Alex', color: '#FF9F43', emoji: 'A' },
  { id: '3', name: 'Maria', color: '#E84393', emoji: 'M' },
  { id: '4', name: 'John', color: '#20BF6B', emoji: 'J' },
  { id: '5', name: 'Sophia', color: '#8854D0', emoji: 'S' },
];

const posts = [
  {
    id: '1',
    name: 'Alex Morgan',
    username: '@alexmorgan',
    caption: 'Beautiful day! Enjoying the little things in life. ☀️',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    likes: 125,
  },
  {
    id: '2',
    name: 'Maria Santos',
    username: '@mariasantos',
    caption: 'New adventures, new memories! 🌿',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800',
    likes: 89,
  },
];

export default function HomeScreen({
  userName,
  onMessages,
  onProfile,
}: Props) {
  const [activeTab, setActiveTab] = useState('For You');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedPosts(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id]
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>VMessage</Text>

        <TouchableOpacity
          style={styles.messageButton}
          onPress={onMessages}
        >
          <Text style={styles.messageIcon}>✉</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* STORIES */}
        <View style={styles.storySection}>
          <Text style={styles.sectionTitle}>Stories</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stories.map(story => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyItem}
                onPress={() =>
                  Alert.alert(story.name, 'Story selected.')
                }
              >
                <View style={[styles.storyCircle, { backgroundColor: story.color }]}>
                  <Text style={styles.storyEmoji}>{story.emoji}</Text>
                </View>
                <Text style={styles.storyName}>{story.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FEED TABS */}
        <View style={styles.tabs}>
          {['For You', 'Following'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* POSTS */}
        {posts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {post.name.charAt(0)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.postName}>{post.name}</Text>
                <Text style={styles.username}>{post.username}</Text>
              </View>

              <Text style={styles.more}>•••</Text>
            </View>

            <Text style={styles.caption}>{post.caption}</Text>

            <Image
              source={{ uri: post.image }}
              style={styles.postImage}
              resizeMode="cover"
            />

            <View style={styles.likeCount}>
              <Text style={styles.countText}>
                ❤️ {post.likes + (likedPosts.includes(post.id) ? 1 : 0)} Likes
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleLike(post.id)}
              >
                <Text style={styles.actionText}>
                  {likedPosts.includes(post.id) ? '❤️ Liked' : '♡ Like'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => Alert.alert('Comments', 'Comment feature coming next.')}
              >
                <Text style={styles.actionText}>💬 Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => Alert.alert('Share', 'Share feature coming next.')}
              >
                <Text style={styles.actionText}>↗ Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 25 }} />
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navActive}>⌂</Text>
          <Text style={styles.navActiveText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onMessages}>
          <Text style={styles.navIcon}>✉</Text>
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => Alert.alert('Discover', 'Discover page coming next.')}
        >
          <Text style={styles.navIcon}>⌕</Text>
          <Text style={styles.navText}>Discover</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onProfile}>
          <Text style={styles.navIcon}>◉</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  header: {
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAF0F6',
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  messageButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageIcon: {
    fontSize: 22,
    color: COLORS.primary,
  },
  storySection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingLeft: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 18,
  },
  storyCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  storyEmoji: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  storyName: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 7,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 9,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.gray,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.primary,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  postName: {
    fontWeight: 'bold',
    color: COLORS.text,
    fontSize: 14,
  },
  username: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 3,
  },
  more: {
    fontSize: 20,
    color: COLORS.gray,
  },
  caption: {
    color: COLORS.text,
    fontSize: 14,
    marginTop: 13,
    marginBottom: 12,
    lineHeight: 21,
  },
  postImage: {
    width: '100%',
    height: 230,
    borderRadius: 12,
    backgroundColor: '#EAF0F6',
  },
  likeCount: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F4',
  },
  countText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 13,
  },
  actionButton: {
    padding: 5,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  bottomNav: {
    height: 65,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAF0F6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 22,
    color: COLORS.gray,
  },
  navActive: {
    fontSize: 23,
    color: COLORS.primary,
  },
  navText: {
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 3,
  },
  navActiveText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 3,
  },
});