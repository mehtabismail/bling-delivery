import { CustomHeader, ScreenWrapper } from "@/src/components";
import React, { FC } from "react";

const Notification: FC<any> = () => {
  return (
    <ScreenWrapper>
      <CustomHeader
        backButton
        centerText='Notifications'
        rightIcon='Notification'
      />
    </ScreenWrapper>
  );
};

export default Notification;
