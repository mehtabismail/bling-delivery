import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const { height } = Dimensions.get("window");

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customModalStyle?: StyleProp<ViewStyle>;
}

export default function CustomModal({
  visible,
  onClose,
  children,
  customModalStyle,
}: CustomModalProps) {
  const translateY = useRef(new Animated.Value(height)).current;
  const [isMounted, setIsMounted] = useState(visible); // control mount

  useEffect(() => {
    if (visible) {
      // When visible true, mount first then animate
      setIsMounted(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      // Animate down then unmount after animation
      Animated.timing(translateY, {
        toValue: height,
        duration: 1000,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        // Unmount after animation ends
        setIsMounted(false);
      });
    }
  }, [visible]);

  // Don’t render Modal at all if not mounted
  if (!isMounted) return null;

  return (
    <Modal transparent visible={isMounted} animationType='none'>
      <View style={styles.overlay}>
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Sliding Content */}
        <Animated.View
          style={[
            styles.modalContent,
            customModalStyle,
            { transform: [{ translateY }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "92%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 16,
  },
});
