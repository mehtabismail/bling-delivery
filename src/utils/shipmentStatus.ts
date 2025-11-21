/**
 * Shipment Status Management Utilities
 * Handles status transitions, button text mapping, and next status calculation
 */

import {
  DirectionsResponse,
  ShipmentSegment,
  ShipmentStatus,
} from "@/src/types/shipments";

/**
 * Allowed status transitions
 */
export const ALLOWED_TRANSITIONS: Record<ShipmentStatus, ShipmentStatus[]> = {
  CREATED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["PICKED_VENDOR", "CANCELLED"],
  PICKED_VENDOR: ["DROPPED_WAREHOUSE", "FAILED"],
  DROPPED_WAREHOUSE: ["PICKED_WAREHOUSE", "FAILED"],
  PICKED_WAREHOUSE: ["DELIVERED", "FAILED"],
  DELIVERED: [], // Final state
  FAILED: [], // Final state
  CANCELLED: [], // Final state
  // Legacy statuses
  waiting: ["in_transit", "canceled"],
  in_transit: ["completed", "canceled"],
  completed: [],
  canceled: [],
};

/**
 * Get next possible statuses for a given status
 */
export const getNextStatuses = (status: ShipmentStatus): ShipmentStatus[] => {
  return ALLOWED_TRANSITIONS[status] || [];
};

/**
 * Check if a status transition is allowed
 */
export const isTransitionAllowed = (
  currentStatus: ShipmentStatus,
  nextStatus: ShipmentStatus
): boolean => {
  return getNextStatuses(currentStatus).includes(nextStatus);
};

/**
 * Get button text based on current status and segment
 */
export const getButtonText = (
  status: ShipmentStatus,
  segment?: ShipmentSegment
): string | null => {
  switch (status) {
    case "CREATED":
      return "Accept Offer";
    case "ASSIGNED":
      return "Picked from Vendor";
    case "PICKED_VENDOR":
      return "Delivered to Warehouse";
    case "DROPPED_WAREHOUSE":
      return "Picked from Warehouse";
    case "PICKED_WAREHOUSE":
      return "Delivered";
    case "DELIVERED":
    case "FAILED":
    case "CANCELLED":
      return null; // No button for final states
    // Legacy statuses
    case "waiting":
      return "Start Delivery";
    case "in_transit":
      return "Complete Delivery";
    case "completed":
    case "canceled":
      return null;
    default:
      return null;
  }
};

/**
 * Get next status based on current status
 */
export const getNextStatus = (
  currentStatus: ShipmentStatus
): ShipmentStatus | null => {
  const nextStatuses = getNextStatuses(currentStatus);
  if (nextStatuses.length === 0) {
    return null;
  }
  // Return the first valid transition (excluding CANCELLED and FAILED)
  const validStatus = nextStatuses.find(
    (s) => s !== "CANCELLED" && s !== "FAILED"
  );
  return validStatus || nextStatuses[0];
};

/**
 * Get stop ID for status update
 *
 * Backend Directions Logic:
 * - CREATED/ASSIGNED → TO_VENDOR (rider → vendor, sequence 1)
 * - PICKED_VENDOR → TO_WAREHOUSE (vendor → warehouse drop, sequence 2)
 * - DROPPED_WAREHOUSE → TO_WAREHOUSE (warehouse drop → warehouse pick, sequence 3)
 * - PICKED_WAREHOUSE → TO_CUSTOMER (warehouse pick → customer, sequence 4)
 * - DELIVERED/FAILED/CANCELLED → TO_CUSTOMER (final state)
 *
 * The directions API always returns toStopId as the destination for the current action:
 * - TO_VENDOR segment: toStopId = vendor location (where we're picking up from)
 * - TO_WAREHOUSE segment:
 *   - For PICKED_VENDOR status: toStopId = warehouse drop location
 *   - For DROPPED_WAREHOUSE status: toStopId = warehouse pick location (sequence 3)
 * - TO_CUSTOMER segment: toStopId = customer location (where we're delivering)
 *
 * IMPORTANT: Always refetch directions before status update to ensure correct segment and toStopId
 */
export const getStopIdForStatusUpdate = (
  directions: DirectionsResponse["data"] | null,
  nextStatus: ShipmentStatus
): string | null => {
  if (!directions || !directions.toStopId) {
    console.error("[ShipmentStatus] Missing directions or toStopId:", {
      hasDirections: !!directions,
      toStopId: directions?.toStopId,
      segment: directions?.segment,
    });
    return null;
  }

  // Always use toStopId - it represents the destination/action point for current segment
  console.log("[ShipmentStatus] Using toStopId for status update:", {
    toStopId: directions.toStopId,
    segment: directions.segment,
    nextStatus,
    toLabel: directions.toLabel,
  });

  return directions.toStopId;
};

/**
 * Determine if shipment is in a final state
 */
export const isFinalState = (status: ShipmentStatus): boolean => {
  return ["DELIVERED", "FAILED", "CANCELLED", "completed", "canceled"].includes(
    status
  );
};

/**
 * Get status display label
 */
export const getStatusLabel = (status: ShipmentStatus): string => {
  const statusLabels: Record<ShipmentStatus, string> = {
    CREATED: "Created",
    ASSIGNED: "Assigned",
    PICKED_VENDOR: "Picked from Vendor",
    DROPPED_WAREHOUSE: "Dropped at Warehouse",
    PICKED_WAREHOUSE: "Picked from Warehouse",
    DELIVERED: "Delivered",
    FAILED: "Failed",
    CANCELLED: "Cancelled",
    waiting: "Waiting",
    in_transit: "In Transit",
    completed: "Completed",
    canceled: "Canceled",
  };
  return statusLabels[status] || status;
};
