/**
 * Custom hook for managing shipment actions
 * Handles accept offer, status updates, and directions fetching
 */

import {
  useAcceptOfferMutation,
  useGetDirectionsQuery,
  useUpdateStatusMutation,
} from "@/src/services/shipments/shipmentsApi";
import { Shipment } from "@/src/types/shipments";
import {
  getButtonText,
  getNextStatus,
  getStopIdForStatusUpdate,
  isFinalState,
} from "@/src/utils/shipmentStatus";
import { toast } from "@/src/utils/toast";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseShipmentActionsOptions {
  shipment: Shipment | null;
  shipmentId: string | null;
  enabled?: boolean;
}

interface UseShipmentActionsReturn {
  // Directions data
  directions: ReturnType<typeof useGetDirectionsQuery>["data"];
  isLoadingDirections: boolean;
  directionsError: any;

  // Button state
  buttonText: string | null;
  isButtonDisabled: boolean;
  isButtonLoading: boolean;

  // Actions
  handleAcceptOffer: () => Promise<void>;
  handleStatusUpdate: () => Promise<void>;
  handleAction: () => Promise<void>;
}

/**
 * Custom hook for shipment actions
 */
export const useShipmentActions = ({
  shipment,
  shipmentId,
  enabled = true,
}: UseShipmentActionsOptions): UseShipmentActionsReturn => {
  // Fetch directions
  const {
    data: directionsData,
    isLoading: isLoadingDirections,
    error: directionsError,
    refetch: refetchDirections,
  } = useGetDirectionsQuery(shipmentId || "", {
    skip: !shipmentId || !enabled,
  });

  // Accept offer mutation
  const [acceptOffer, { isLoading: isAcceptingOffer }] =
    useAcceptOfferMutation();

  // Update status mutation
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateStatusMutation();

  // Local status override to reflect immediate UI updates
  const [localStatus, setLocalStatus] = useState<Shipment["status"] | null>(
    shipment?.status || null
  );

  // Sync local status when shipment status changes
  useEffect(() => {
    setLocalStatus(shipment?.status || null);
  }, [shipment?.status]);

  // Determine effective status (local override > shipment status)
  const currentStatus = localStatus;

  // Get button text based on status and segment
  const buttonText = useMemo(() => {
    if (!currentStatus) return null;
    const segment = directionsData?.data?.segment;
    return getButtonText(currentStatus, segment);
  }, [currentStatus, directionsData?.data?.segment]);

  // Check if button should be disabled
  const isButtonDisabled = useMemo(() => {
    if (!currentStatus) return true;
    if (isFinalState(currentStatus)) return true;
    if (!buttonText) return true;
    return false;
  }, [currentStatus, buttonText]);

  // Check if button is loading
  const isButtonLoading = isAcceptingOffer || isUpdatingStatus;

  // Handle accept offer
  const handleAcceptOffer = useCallback(async () => {
    if (!shipment || !shipmentId || !shipment.offerId) {
      toast.error("Offer ID not found");
      return;
    }

    try {
      await acceptOffer({
        shipmentId,
        body: { offerId: shipment.offerId },
      }).unwrap();

      toast.success("Offer accepted successfully!");
      setLocalStatus("ASSIGNED");
      // Refetch directions after accepting offer
      refetchDirections();
    } catch (error: any) {
      console.error("Accept offer error:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to accept offer"
      );
      throw error;
    }
  }, [shipment, shipmentId, acceptOffer, refetchDirections]);

  // Handle status update
  const handleStatusUpdate = useCallback(async () => {
    console.log("[ShipmentActions] Starting status update...");

    if (!shipment || !shipmentId || !currentStatus) {
      console.error("[ShipmentActions] Missing shipment data:", {
        hasShipment: !!shipment,
        shipmentId,
        currentStatus,
      });
      toast.error("Invalid shipment data");
      return;
    }

    const nextStatus = getNextStatus(currentStatus);
    console.log("[ShipmentActions] Next status calculated:", {
      currentStatus,
      nextStatus,
    });

    if (!nextStatus) {
      console.error(
        "[ShipmentActions] No valid next status for:",
        currentStatus
      );
      toast.error("No valid next status available");
      return;
    }

    // IMPORTANT: Always refetch directions before status update
    // This ensures we have the latest segment and toStopId, especially for:
    // - DROPPED_WAREHOUSE → PICKED_WAREHOUSE (needs TO_WAREHOUSE segment with warehouse pick stop)
    // - Other transitions that depend on current segment
    console.log(
      "[ShipmentActions] Refetching directions before status update..."
    );
    let freshDirections;
    try {
      const result = await refetchDirections();
      freshDirections = result.data;
      console.log("[ShipmentActions] Fresh directions fetched:", {
        segment: freshDirections?.data?.segment,
        toStopId: freshDirections?.data?.toStopId,
        toLabel: freshDirections?.data?.toLabel,
      });
    } catch (error) {
      console.error("[ShipmentActions] Failed to refetch directions:", error);
      // Continue with existing directions if refetch fails
      freshDirections = directionsData;
    }

    // Get stop ID from fresh directions
    const stopId = getStopIdForStatusUpdate(
      freshDirections?.data || null,
      nextStatus
    );

    if (!stopId) {
      console.error("[ShipmentActions] Stop ID not found from directions:", {
        hasDirections: !!freshDirections?.data,
        toStopId: freshDirections?.data?.toStopId,
        segment: freshDirections?.data?.segment,
        currentStatus,
        nextStatus,
      });
      toast.error("Stop ID not found. Please try again.");
      return;
    }

    console.log("[ShipmentActions] Calling update status API:", {
      shipmentId,
      status: nextStatus,
      atStopId: stopId,
      segment: freshDirections?.data?.segment,
    });

    try {
      await updateStatus({
        shipmentId,
        body: {
          status: nextStatus,
          atStopId: stopId,
        },
      }).unwrap();

      console.log("[ShipmentActions] Status updated successfully!");
      toast.success("Status updated successfully!");
      setLocalStatus(nextStatus);
      // Refetch directions after status update to get new segment
      refetchDirections();
    } catch (error: any) {
      console.error("[ShipmentActions] ❌ Update status API error:", {
        error,
        errorData: error?.data,
        errorMessage: error?.message,
        errorStatus: error?.status,
      });

      // Show improved error message if backend provides expected stop ID
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update status";
      const expectedStopId = error?.data?.expectedStopId;

      if (expectedStopId) {
        toast.error(`${errorMessage}\nExpected stop ID: ${expectedStopId}`);
      } else {
        toast.error(errorMessage);
      }

      throw error;
    }
  }, [
    shipment,
    shipmentId,
    currentStatus,
    directionsData,
    updateStatus,
    refetchDirections,
  ]);

  // Handle action (accept offer or status update)
  const handleAction = useCallback(async () => {
    if (isButtonDisabled || isButtonLoading) {
      return;
    }

    try {
      if (currentStatus === "CREATED") {
        await handleAcceptOffer();
      } else {
        await handleStatusUpdate();
      }
    } catch (error) {
      // Error already handled in individual functions
      // Just re-throw to prevent further execution
    }
  }, [
    isButtonDisabled,
    isButtonLoading,
    currentStatus,
    handleAcceptOffer,
    handleStatusUpdate,
  ]);

  return {
    directions: directionsData,
    isLoadingDirections,
    directionsError,

    buttonText,
    isButtonDisabled,
    isButtonLoading,

    handleAcceptOffer,
    handleStatusUpdate,
    handleAction,
  };
};
