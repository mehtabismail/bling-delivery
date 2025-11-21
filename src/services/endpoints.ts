export const apiEndpoints = {
  login: "auth/login",
  shipments: "me/shipments",
  acceptOffer: (shipmentId: string) =>
    `me/shipments/${shipmentId}/assign/accept`,
  getDirections: (shipmentId: string) =>
    `me/shipments/${shipmentId}/directions`,
  updateStatus: (shipmentId: string) => `me/shipments/${shipmentId}/status`,
  profile: "user/me",
  updatePassword: "user/me/password",
  uploadMedia: "media/upload",
};
