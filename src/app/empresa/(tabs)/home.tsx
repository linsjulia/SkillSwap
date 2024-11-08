import { View, Text, StyleSheet} from 'react-native';

export default function Home() {
    return(
        <View className='justify-center'>
            <Text style={styles.Text}>TELA DA EMPRESAA</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Text: {
        color: 'black',
        fontSize: 50,
        
    }
})