import { StyleSheet, View, Text, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import { CardWork } from "./user/homePage/homePage";
import { router } from "expo-router";

export type SliderType = {
    id: string;
    title: string;
    image: string;
    description: string;
    nameEnterprise: string;
    salary: string;
    workForm: string;
    location: string;
    requirements: string[];
    benefits: string[];
};

type Props = {
    item: SliderType,
    index: number;
}

const { width } = Dimensions.get('screen');

const SliderItem = ({ item }: Props) => {
    return (
        <View className="justify-center">
         

            <View style={styles.neonBorder}>
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', top: 50 }}>
                        <Pressable onPress={() => { 
                            console.log('Navigating with requirements:', item.requirements); 
                            router.push({
                                pathname: '/(stack)/jobDescription',
                                params: {
                                    vagaId: item.id,  
                                    title: item.title,
                                    image: item.image,
                                    description: item.description,
                                    nameEnterprise: item.nameEnterprise,
                                    salary: item.salary,
                                    workForm: item.workForm,
                                    location: item.location, 
                                    requirements: JSON.stringify(item.requirements),
                                    benefits: JSON.stringify(item.benefits)
                                }    
                            })
                        }}>
                            <CardWork
                                title2={item.title || "Título não disponível"}
                                description2={item.description || "Descrição não disponível"}
                                nameEnterprise2={item.nameEnterprise || "Empresa não disponível"}
                                image2={item.image || "Imagem não disponível"} userName={""} userEmail={""} userProfileImage={""}                            />
                     
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    neonBorder: {
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
        height: 380,
        width: 310,
        borderColor: "#6a00ff",
        shadowColor: "#6a00ff",
        shadowOpacity: 0.8,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 28,
        width: width,
    }
});
