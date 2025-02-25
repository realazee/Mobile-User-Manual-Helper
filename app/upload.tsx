import React, { useState } from 'react';
import { Image, StyleSheet, Platform, Button, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.canceled === false) {
      setFile(result);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
     

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Pick a Document!</ThemedText>
        <Button title="Pick a Document" onPress={pickDocument} />
        {file && !file.canceled && (
          <ThemedText style={styles.selectedFileText}>
            Selected File: {file.assets[0].name}
          </ThemedText>
        )}
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  selectedFileText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
