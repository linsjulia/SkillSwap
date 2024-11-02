import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
    title: string;
   // image: ImageSourcePropType;
    description: string;
    nameEnterprise: string;
};

export const ImageSlider = [
    {
        title: 'Icon OK',
        nameEnterprise: 'empresa',
        //image: require('../assets/github.png'),
        description: 'nao sei'
    },

    {
        title: 'Git Hub',
        nameEnterprise: 'empresa',
       // image: require('../assets/google.png'),
        description: 'nap seo'

    },

    {
        title: 'Google',
        nameEnterprise: 'empresa',
       // image: require('../assets/iconOK.png'),
        description: 'napo sei'

    }
]