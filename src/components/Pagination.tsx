import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageSliderType } from '../components/SliderData'
import { SharedValue } from "react-native-reanimated";

type Props = {
    items: ImageSliderType[];
    paginationIndex: number;
    scrollX: SharedValue<number>
}

const Pagination = ({items, paginationIndex, scrollX}:Props) => {
    return(
        <View style={styles.container}>
            {items.map((_,index) => {
                return(
                    <View key={index} style={[styles.dot, {backgroundColor: paginationIndex === index ? '#00a2ff' : "#919191"}]}/>
                )
            })}
            {/* <Text style={{ color: 'white'}}>Pagination</Text> */}
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
     container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
     },

     dot: {
        height: 8,
        width: 8,
        marginHorizontal: 3,
        borderRadius: 8,
        bottom: 90,
     }
})