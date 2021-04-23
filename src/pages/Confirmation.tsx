import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hub';
  nextScreen: string;
}

const emojis = {
  hub: '🤗',
  smile: '😃',
};

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handlerConfirmation() {
    navigation.navigate(nextScreen);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handlerConfirmation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subtitle: {
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
  },
  footer: {
    width: '100%',
    marginTop: 50,
    paddingHorizontal: 20,
  },
});
