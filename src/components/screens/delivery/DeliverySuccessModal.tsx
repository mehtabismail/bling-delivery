import CustomButton from "@/src/components/CustomButton";
import CustomModal from "@/src/components/CustomModal";
import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DeliverySuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onThanksPress: () => void;
}

const DeliverySuccessModal: React.FC<DeliverySuccessModalProps> = ({
  visible,
  onClose,
  onThanksPress,
}) => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      customModalStyle={styles.modalContent}
    >
      <View style={[Layout.fill, Layout.center, Gutters.regularPadding]}>
        {/* Success Icon */}
        <View style={[Layout.center, Gutters.largeBMargin]}>
          <View style={styles.iconContainer}>
            <Images.svg.Done_Icon.default
              width={mS(60)}
              height={mS(60)}
              fill={Colors.white}
            />
          </View>
        </View>

        {/* Main Message */}
        <Text style={[Fonts.POPPINS_MEDIUM_24, styles.mainText]}>
          Delivery done!
        </Text>

        {/* Sub Message */}
        <Text style={[Fonts.POPPINS_REGULAR_15, styles.subText]}>
          Appreciate your efforts out there.
        </Text>

        {/* Thanks Button */}
        <View style={[Layout.fullWidth, Gutters.largeTMargin]}>
          <CustomButton
            btnText="Thanks"
            onPress={onThanksPress}
            customStyle={styles.thanksButton}
          />
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "auto",
    maxHeight: "60%",
    paddingVertical: mS(40),
    paddingHorizontal: mS(24),
    position: "relative",
    top: "20%",
    alignSelf: "center",
    width: "90%",
    maxWidth: mS(400),
  },
  iconContainer: {
    width: mS(120),
    height: mS(120),
    borderRadius: mS(60),
    backgroundColor: "#6096B4", // Teal/blue-grey color from image
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: mS(12),
  },
  subText: {
    color: "#61605D",
    textAlign: "center",
    lineHeight: mS(22),
  },
  thanksButton: {
    backgroundColor: "#2F5F6B", // Darker teal from image
    height: mS(48),
  },
});

export default DeliverySuccessModal;
