import { CustomButton, CustomTextInput } from "@/src/components";
import { useTheme } from "@/src/hooks";
import { useUploadMediaMutation } from "@/src/services/media/mediaApi";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/src/services/user/userApi";
import { UpdateProfilePayload, UserProfile } from "@/src/types/user";
import { mS } from "@/src/utils/helper";
import { showToast } from "@/src/utils/toast";
import * as ImagePicker from "expo-image-picker";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  userName: string;
  profileImageUrl?: string | null;
  profileImage?: string | null;
};

const ProfileForm: React.FC = () => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const { t } = useTranslation();

  const {
    data: profileData,
    isFetching: isProfileFetching,
    isLoading: isProfileLoading,
  } = useGetUserProfileQuery();

  const [updateUserProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserProfileMutation();
  const [uploadMedia] = useUploadMediaMutation();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    userName: "",
    profileImageUrl: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const initialFormRef = useRef<FormState | null>(null);
  const [isImageUpdating, setIsImageUpdating] = useState(false);

  const mapProfileToForm = useCallback((profile: UserProfile): FormState => {
    const profileImageValue =
      profile.profileImage ?? profile.profileImageUrl ?? null;

    return {
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      email: profile.email ?? "",
      phoneNo: profile.phoneNo ?? "",
      userName: profile.userName ?? "",
      profileImageUrl: profile.profileImageUrl ?? profileImageValue,
      profileImage: profileImageValue,
    };
  }, []);

  useEffect(() => {
    if (profileData) {
      const mapped = mapProfileToForm(profileData);
      setForm(mapped);
      initialFormRef.current = mapped;
    }
  }, [profileData, mapProfileToForm]);

  const handleChangeInput = (value: string, fieldName?: string) => {
    if (!fieldName) return;

    setForm((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const requiredMessage = t("common:errors.required_field", "Required");

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = requiredMessage;
    if (!form.lastName.trim()) newErrors.lastName = requiredMessage;
    if (!form.userName.trim()) newErrors.userName = requiredMessage;

    return newErrors;
  }, [form.firstName, form.lastName, form.userName, requiredMessage]);

  const isFormDirty = useMemo(() => {
    if (!initialFormRef.current) return false;
    return (
      form.firstName !== initialFormRef.current.firstName ||
      form.lastName !== initialFormRef.current.lastName ||
      form.userName !== initialFormRef.current.userName ||
      form.phoneNo !== initialFormRef.current.phoneNo ||
      form.profileImage !== initialFormRef.current.profileImage
    );
  }, [form]);

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload: UpdateProfilePayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      userName: form.userName.trim(),
    };

    if (
      initialFormRef.current &&
      form.profileImage !== initialFormRef.current.profileImage &&
      form.profileImage
    ) {
      payload.profileImage = form.profileImage;
    }

    if (form.phoneNo.trim().length > 0) {
      payload.phoneNo = form.phoneNo.trim();
    }

    try {
      const updatedProfile = await updateUserProfile(payload).unwrap();
      const mapped = mapProfileToForm(updatedProfile);
      setForm(mapped);
      initialFormRef.current = mapped;

      showToast({
        type: "success",
        text1: t("common:profile.updated_success", "Profile updated"),
      });
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        t("common:errors.something_went_wrong", "Something went wrong");

      showToast({
        type: "error",
        text1: t("common:profile.update_failed", "Update failed"),
        text2: errorMessage,
      });
    }
  };

  const avatarSource =
    form.profileImageUrl && form.profileImageUrl.length > 0
      ? { uri: form.profileImageUrl }
      : null;

  const isSubmitDisabled =
    !isFormDirty ||
    isUpdatingProfile ||
    isProfileFetching ||
    isProfileLoading ||
    isImageUpdating;

  const handleSelectProfileImage = useCallback(async () => {
    try {
      setIsImageUpdating(true);
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        showToast({
          type: "error",
          text1: t(
            "common:profile.permission_denied",
            "Media library permission denied"
          ),
        });
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.IMAGE,
        allowsEditing: true,
        quality: 0.8,
      });

      if (pickerResult.canceled || !pickerResult.assets?.length) {
        return;
      }

      const asset = pickerResult.assets[0];
      if (!asset.uri) {
        showToast({
          type: "error",
          text1: t(
            "common:profile.image_pick_failed",
            "Image selection failed"
          ),
        });
        return;
      }

      const fileName =
        asset.fileName ||
        `profile-${Date.now()}.${asset.mimeType?.split("/")[1] || "jpg"}`;
      const mimeType = asset.mimeType || "image/jpeg";

      const formData = new FormData();
      formData.append("files", {
        uri: asset.uri,
        name: fileName,
        type: mimeType,
      } as any);

      const uploadResponse = await uploadMedia({
        formData,
        type: "image",
      }).unwrap();

      const uploadedFile = uploadResponse?.data?.data?.files?.[0];
      if (!uploadedFile?.url) {
        throw new Error("Upload response missing file URL");
      }

      const newImageUrl = uploadedFile.url;

      setForm((prev) => ({
        ...prev,
        profileImageUrl: newImageUrl,
        profileImage: newImageUrl,
      }));

      await updateUserProfile({ profileImage: newImageUrl }).unwrap();

      if (initialFormRef.current) {
        initialFormRef.current = {
          ...initialFormRef.current,
          profileImageUrl: newImageUrl,
          profileImage: newImageUrl,
        };
      }

      showToast({
        type: "success",
        text1: t("common:profile.image_updated", "Profile image updated"),
      });
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        t("common:errors.something_went_wrong", "Something went wrong");
      showToast({
        type: "error",
        text1: t("common:profile.image_update_failed", "Image update failed"),
        text2: errorMessage,
      });
    } finally {
      setIsImageUpdating(false);
    }
  }, [t, uploadMedia, updateUserProfile]);

  return (
    <View style={[Layout.fill]}>
      {/* Profile Image Section */}
      <View
        style={[Layout.center, Gutters.largeTMargin, Gutters.regularBMargin]}
      >
        <View style={styles.avatarWrapper}>
          <View
            style={[
              Layout.center,
              Layout.overflow,
              Gutters.xLargeXGapRadius,
              createStyles.avatarContainer(Colors),
            ]}
          >
            {avatarSource ? (
              <Image
                source={avatarSource}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <Images.svg.Profile.default
                width={mS(60)}
                height={mS(60)}
                fill={Colors.text_91A8AD}
              />
            )}
            {isImageUpdating && (
              <View style={styles.avatarLoader}>
                <ActivityIndicator size="small" color={Colors.white} />
              </View>
            )}
          </View>

          {/* Edit Icon */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSelectProfileImage}
            disabled={isImageUpdating}
            style={[
              Layout.absolute,
              Layout.bottom0,
              Layout.right0,
              Layout.center,
              Gutters.xTinyGapRadius,
              createStyles.editButton(Colors),
            ]}
          >
            <Images.svg.Edit.default
              width={mS(14)}
              height={mS(14)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Fields */}
      <View style={[Layout.screenWithoutFill]}>
        <CustomTextInput
          headingText={t("common:profile.first_name")}
          placeholder={t("common:profile.choose_one")}
          value={form.firstName}
          fieldName="firstName"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          error={errors.firstName}
        />

        <CustomTextInput
          headingText={t("common:profile.last_name")}
          placeholder={t("common:profile.choose_one")}
          value={form.lastName}
          fieldName="lastName"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          error={errors.lastName}
        />

        <CustomTextInput
          headingText={t("common:profile.email_address")}
          placeholder={t("common:profile.choose_one")}
          value={form.email}
          fieldName="email"
          handleChangeInput={handleChangeInput}
          keyboardType="email-address"
          type="text"
          error={errors.email}
          editable={false}
        />

        <CustomTextInput
          headingText={t("common:profile.phone_number")}
          placeholder={t("common:profile.enter_full_address")}
          value={form.phoneNo}
          fieldName="phoneNo"
          handleChangeInput={handleChangeInput}
          keyboardType="phone-pad"
          type="text"
          error={errors.phoneNo}
        />

        <CustomTextInput
          headingText={t("common:profile.user_name", "Username")}
          placeholder={t("common:profile.choose_one")}
          value={form.userName}
          fieldName="userName"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          error={errors.userName}
        />
      </View>

      {/* Apply Button */}
      <View style={[Layout.screenWithoutFill, Gutters.largeTMargin]}>
        <CustomButton
          btnText={t("common:apply")}
          onPress={handleSubmit}
          customStyle={[{ backgroundColor: Colors.primary }]}
          loading={isUpdatingProfile}
          disabled={isSubmitDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});

const createStyles = {
  avatarContainer: (Colors: any) => ({
    width: mS(120),
    height: mS(120),
    backgroundColor: Colors.textinput_background,
  }),
  editButton: (Colors: any) => ({
    backgroundColor: Colors.primary,
    width: mS(32),
    height: mS(32),
    borderWidth: 3,
    borderColor: Colors.white,
  }),
};

export default ProfileForm;
