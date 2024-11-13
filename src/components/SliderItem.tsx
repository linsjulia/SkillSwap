import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { ImageSliderType } from '../components/SliderData'
import { BotaoVagas, CardWork } from "./user/homePage/homePage";



type Props = {
    item: ImageSliderType,
    index: number;
}

const {width} = Dimensions.get('screen');

const SliderItem = ({ item }: Props) => {
    return (
        <View className="justify-center">
            <View style={styles.neonBorder}>
                
                <View style={styles.container}>
                <CardWork
            title2={item.title}
            description2={item.description}
            nameEnterprise2={item.nameEnterprise}
            />
              
                </View>
            </View>
        
        </View>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
       neonBorder:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        width: width,
        gap: 28,
    },

    container: {
        padding: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#6a00ff",
        shadowColor: "#6a00ff",
        shadowOpacity: 0.8,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
    },

    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 28,
        width: width,
    } 
});