import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface SlideToConfirmProps {
  onConfirm: () => void;
  disabled?: boolean;
  loading?: boolean;
  customStyle?: ViewStyle;
}

const SlideToConfirm: React.FC<SlideToConfirmProps> = ({
  onConfirm,
  disabled = false,
  loading = false,
  customStyle,
}) => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const panValue = useRef(0);
  const slideWidth = useRef(0);

  // Listen to pan value changes
  useEffect(() => {
    const listener = pan.addListener(({ value }) => {
      panValue.current = value;
    });

    return () => {
      pan.removeListener(listener);
    };
  }, [pan]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && !loading && !isConfirmed,
      onMoveShouldSetPanResponder: () => !disabled && !loading && !isConfirmed,
      onPanResponderGrant: () => {
        pan.setOffset(panValue.current);
      },
      onPanResponderMove: (evt, gestureState) => {
        const newValue = Math.max(
          0,
          Math.min(gestureState.dx, slideWidth.current - mS(60))
        );
        pan.setValue(newValue);
      },
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();
        const threshold = slideWidth.current * 0.8; // 80% of width to confirm

        if (gestureState.dx >= threshold) {
          // Slide completed - trigger confirmation
          Animated.timing(pan, {
            toValue: slideWidth.current - mS(60),
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setIsConfirmed(true);
            onConfirm();
            // Reset after a short delay
            setTimeout(() => {
              setIsConfirmed(false);
              Animated.timing(pan, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
              }).start();
            }, 1000);
          });
        } else {
          // Slide not completed - spring back
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View
      style={[styles.container, customStyle]}
      onLayout={(event) => {
        slideWidth.current = event.nativeEvent.layout.width;
      }}
    >
      {/* Background track */}
      <View style={[styles.track, { backgroundColor: "#2E5963" }]}>
        <Text style={[Fonts.POPPINS_MEDIUM_16, styles.trackText]}>
          Slide to confirm
        </Text>
      </View>

      {/* Sliding thumb */}
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX: pan }],
            backgroundColor: disabled || loading ? "#E6E6E6" : "#003441",
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Images.svg.Slide_To_Confirm.default width={mS(24)} height={mS(24)} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: mS(56),
    width: "100%",
    position: "relative",
    borderRadius: mS(28),
    overflow: "hidden",
  },
  track: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: mS(28),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: mS(20),
  },
  trackText: {
    color: "white",
  },
  thumb: {
    position: "absolute",
    left: mS(4),
    top: mS(4),
    width: mS(48),
    height: mS(48),
    borderRadius: mS(24),
    backgroundColor: "#003441",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SlideToConfirm;
