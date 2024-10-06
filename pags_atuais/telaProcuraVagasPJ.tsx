import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import Box from '../src/components/jobSearchScreen/boxNameJobs';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.paragraph}>
        Feed de Curriculos
      </Text>
      </View>
      <View style={styles.borda}>
      <Box></Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 10,
  },

  borda: {
    backgroundColor: 'transparent',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'white',
      width: 320,
      height: 500,
      position: 'absolute',
      top: 190,
      justifyContent: 'center',
      alignItems: 'center',
  },

  /*  box: {
      backgroundColor: '#696969',
      borderRadius: 25,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    }, */

  header: {
    position: 'absolute',
    top: 60,
    width: 200,
    height: 100,
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  paragraph: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '500',
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
});
