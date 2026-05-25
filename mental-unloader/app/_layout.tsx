import { SafeAreaView, StyleSheet } from 'react-native';

import HomeScreen from './index';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8fb',
  },
});
