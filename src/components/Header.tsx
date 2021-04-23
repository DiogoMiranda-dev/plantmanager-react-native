import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/user.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps{
  title: string
}

export function Header({ title }: HeaderProps) {
  const [name, setName] = useState<string>();

  useEffect(() => {
    async function loadStorageName() {
      const name = await AsyncStorage.getItem('@plantmanager:user');
      setName(name || '');
    }
    loadStorageName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{title}</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
      <Image style={styles.image} source={userImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 28,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 24,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});
