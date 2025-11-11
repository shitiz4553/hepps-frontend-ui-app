import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors } from '@/constants/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Bottom sheet snap points
const MIN_HEIGHT = 180; // Collapsed state
const MAX_HEIGHT = SCREEN_HEIGHT * 0.85; // Expanded state

interface BottomSheetProps {
  children: React.ReactNode;
}

export default function BottomSheet({ children }: BottomSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT - MIN_HEIGHT);
  const context = useSharedValue({ y: 0 });

  useEffect(() => {
    // Initialize to collapsed state
    translateY.value = withSpring(SCREEN_HEIGHT - MIN_HEIGHT, {
      damping: 50,
      stiffness: 400,
    });
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const newTranslateY = event.translationY + context.value.y;
      // Constrain the movement
      translateY.value = Math.max(
        SCREEN_HEIGHT - MAX_HEIGHT,
        Math.min(SCREEN_HEIGHT - MIN_HEIGHT, newTranslateY)
      );
    })
    .onEnd((event) => {
      const velocityY = event.velocityY;
      const currentY = translateY.value;
      
      // Determine snap point based on velocity and position
      if (velocityY < -500) {
        // Fast swipe up - expand
        translateY.value = withSpring(SCREEN_HEIGHT - MAX_HEIGHT, {
          damping: 50,
          stiffness: 400,
          velocity: velocityY,
        });
      } else if (velocityY > 500) {
        // Fast swipe down - collapse
        translateY.value = withSpring(SCREEN_HEIGHT - MIN_HEIGHT, {
          damping: 50,
          stiffness: 400,
          velocity: velocityY,
        });
      } else {
        // Snap to nearest point based on position
        const midPoint = SCREEN_HEIGHT - (MIN_HEIGHT + MAX_HEIGHT) / 2;
        if (currentY < midPoint) {
          translateY.value = withSpring(SCREEN_HEIGHT - MAX_HEIGHT, {
            damping: 50,
            stiffness: 400,
          });
        } else {
          translateY.value = withSpring(SCREEN_HEIGHT - MIN_HEIGHT, {
            damping: 50,
            stiffness: 400,
          });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [SCREEN_HEIGHT - MAX_HEIGHT, SCREEN_HEIGHT - MIN_HEIGHT],
      [0, 24],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }],
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheet, animatedStyle]}>
        {/* Handle Bar */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        
        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.secondary,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

