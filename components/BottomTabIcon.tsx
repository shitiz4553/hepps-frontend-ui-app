import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Home2, Location, User } from "iconsax-react-native";
import { colors } from "@/constants/colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";

interface BottomTabIconProps {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({ route, isFocused }: BottomTabIconProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isFocused) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 100 }),
        withSpring(1, { damping: 10, stiffness: 100 })
      );
    } else {
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }
  }, [isFocused, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderIcon = (route: string, isFocused: boolean) => {
    const color = isFocused ? colors.white : colors.text.placeholder;
    const size = 24;

    switch (route) {
      case "nearby":
        return <Location size={size} color={color} variant={isFocused ? "Bold" : "Outline"} />;
      case "hangout":
        return <Home2 size={size} color={color} variant={isFocused ? "Bold" : "Outline"} />;
      case "you":
        return <User size={size} color={color} variant={isFocused ? "Bold" : "Outline"} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderIcon(route, isFocused)}
    </Animated.View>
  );
};

export default BottomTabIcon;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

