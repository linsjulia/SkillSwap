import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";
import SliderItem from "./SliderItem";
import { ImageSlider, ImageSliderType } from "./SliderData";

// Defina um tipo para os dados das vagas
export type JobType = {
    id: string;         
    Titulo: string;     
    Descricao: string; 
    EmpresaNome: string;
};

const Slider = () => {

    return (
        <View> 
                <FlatList
                    data={ImageSlider}
                    renderItem={({ item, index }) => (
                        <SliderItem item={item} index={index}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
        </View>
    );
};


export default Slider;
