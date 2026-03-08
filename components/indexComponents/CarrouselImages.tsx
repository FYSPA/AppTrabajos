import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function CarrouselImages() {
    const seconds = 6000;
    const xPosition = useRef(new Animated.Value(0)).current;

    const carouselData = [
        {
            source: require("../../assets/indexImages/logo.png"),
            style: styles.logoStyle,
        },
        {
            source: require("../../assets/indexImages/practice.png"),
            style: styles.practiceStyle,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        Animated.timing(xPosition, {
            toValue: -400,
            easing: Easing.back(1.5),
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
            );
        });
    };

    useEffect(() => {
        const interval = setInterval(nextImage, seconds);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        xPosition.setValue(500);
        Animated.timing(xPosition, {
            toValue: 0,
            easing: Easing.back(1.5),
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={carouselData[currentIndex].source}
                style={[carouselData[currentIndex].style, { transform: [{ translateX: xPosition }] }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoStyle: {
        width: "100%",
        height: "90%",
        resizeMode: "contain",
    },

    practiceStyle: {
        width: "150%",
        height: "150%",
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "center",
        left: 30,
    }
});