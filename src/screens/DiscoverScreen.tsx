import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { COLORS } from '../styles/theme';

type Props = {
  onBack: () => void;
};

const topics = [
  '#Technology',
  '#InformationTechnology',
  '#Programming',
  '#Gaming',
  '#Photography',
  '#Travel',
  '#Education',
  '#Lifestyle',
];

const users = [
  { id: 1, name: 'Alex Morgan', username: '@alexmorgan', avatar: 'A', color: '#1877F2' },
  { id: 2, name: 'Maria Santos', username: '@maria', avatar: 'M', color: '#E84393' },
  { id: 3, name: 'John Smith', username: '@johnsmith', avatar: 'J', color: '#20BF6B' },
];

const explorePosts = [
  {
    id: 1,
    title: 'Beautiful Nature',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=700',
  },
  {
    id: 2,
    title: 'Mountain Adventure',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700',
  },
  {
    id: 3,
    title: 'Technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700',
  },
  {
    id: 4,
    title: 'City Life',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=700',
  },
];

export default function DiscoverScreen({ onBack }: Props) {
  const [search, setSearch] = useState('');
  const [following, setFollowing] = useState<number[]>([]);

 const filteredUsers = users.filter(user =>
  '$DIL2 $DIL3'
    .toLowerCase()
    .includes(search.toLowerCase())
);

  const filteredTopics = topics.filter(topic =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPosts = explorePosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFollow = (id: number) => {
    setFollowing(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id]
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discover</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search people, topics, posts..."
            placeholderTextColor={COLORS.gray}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clear}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* TRENDING TOPICS */}
        <Text style={styles.sectionTitle}>Trending Topics</Text>

        <View style={styles.topicContainer}>
          {filteredTopics.map(topic => (
            <TouchableOpacity
              key={topic}
              style={styles.topic}
              onPress={() => setSearch(topic)}
            >
              <Text style={styles.topicText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PEOPLE */}
        <Text style={styles.sectionTitle}>People You May Know</Text>

        {filteredUsers.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={[styles.avatar, { backgroundColor: user.color }]}>
              <Text style={styles.avatarText}>{user.avatar}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.username}>{user.username}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.followButton,
                following.includes(user.id) && styles.followingButton,
              ]}
              onPress={() => toggleFollow(user.id)}
            >
              <Text style={[
                styles.followText,
                following.includes(user.id) && styles.followingText,
              ]}>
                {following.includes(user.id) ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* EXPLORE POSTS */}
        <Text style={styles.sectionTitle}>Explore Posts</Text>

        <View style={styles.grid}>
          {filteredPosts.map(post => (
            <TouchableOpacity key={post.id} style={styles.postCard}>
              <Image
                source={{ uri: post.image }}
                style={styles.postImage}
              />
              <Text style={styles.postTitle}>{post.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
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
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  back: {
    fontSize: 38,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 17,
    paddingHorizontal: 15,
    height: 52,
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
  clear: {
    fontSize: 24,
    color: COLORS.gray,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 14,
  },
  topicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  topic: {
    backgroundColor: '#EAF3FF',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    margin: 4,
  },
  topicText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 13,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 13,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  username: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 3,
  },
  followButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 9,
  },
  followingButton: {
    backgroundColor: '#EAF3FF',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  followText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  followingText: {
    color: COLORS.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  postCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 130,
    backgroundColor: '#EAF0F6',
  },
  postTitle: {
    padding: 10,
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 13,
  },
});