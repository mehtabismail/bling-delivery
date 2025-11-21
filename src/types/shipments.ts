/**
 * Shipment Types
 * Type definitions for shipment data and API responses
 */

/**
 * Shipment status types (backend enum)
 */
export type ShipmentStatus =
  | "CREATED"
  | "ASSIGNED"
  | "PICKED_VENDOR"
  | "DROPPED_WAREHOUSE"
  | "PICKED_WAREHOUSE"
  | "DELIVERED"
  | "FAILED"
  | "CANCELLED"
  // Legacy statuses for backward compatibility
  | "waiting"
  | "in_transit"
  | "completed"
  | "canceled";

/**
 * Shipment stop types
 */
export type ShipmentStopType = "VENDOR" | "WAREHOUSE" | "CUSTOMER";

/**
 * Shipment segment types
 */
export type ShipmentSegment = "TO_VENDOR" | "TO_WAREHOUSE" | "TO_CUSTOMER";

/**
 * Tab types for filtering shipments
 */
export type ShipmentTab = "all" | "offers" | "active" | "history";

/**
 * Warehouse location
 */
export interface WarehouseLocation {
  id: string;
  name: string;
  address: string;
  placeId: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  isActive: boolean;
}

/**
 * Destination location
 */
export interface DestinationLocation {
  address: string;
  city: string | null;
  placeId: string;
  latitude: number;
  longitude: number;
  type: "warehouse" | "vendor" | "customer";
}

/**
 * Single shipment item
 */
export interface Shipment {
  id: string;
  orderNo: string;
  vendorName: string;
  status: ShipmentStatus;
  createdAt: string;
  // Offer fields (present when status is CREATED)
  offerId?: string;
  offerStatus?: "PENDING" | "ACCEPTED" | "EXPIRED" | "REJECTED";
  offerEtaSeconds?: number | null;
  offerDistanceM?: number | null;
  offerExpiresAt?: string;
  offerCreatedAt?: string;
  // Location fields
  warehouse?: WarehouseLocation;
  destinationLocation?: DestinationLocation;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  cursor: string | null;
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
}

/**
 * Raw API response from server (wrapped format)
 */
export interface ShipmentsApiResponse {
  success: boolean;
  timestamp: string;
  message: string;
  data: Shipment[];
  pagination: PaginationMeta;
}

/**
 * Shipments API response (transformed format)
 */
export interface ShipmentsResponse {
  data: Shipment[];
  pagination: PaginationMeta;
}

/**
 * Shipments query parameters
 */
export interface ShipmentsQueryParams {
  tab?: ShipmentTab;
  limit?: number;
  cursor?: string | null;
}

/**
 * Map filter to API tab parameter
 */
export const filterToTab = (filter: string): ShipmentTab => {
  switch (filter) {
    case "offers":
      return "offers";
    case "in_transit":
    case "canceled":
      return "active"; // Both in_transit and canceled are "active" shipments
    case "completed":
      return "history"; // Completed shipments are in history
    case "all":
    default:
      return "all";
  }
};

/**
 * Filter shipments by status (client-side filtering for active tab)
 */
export const filterShipmentsByStatus = (
  shipments: Shipment[],
  filter: string
): Shipment[] => {
  if (filter === "all" || filter === "offers") {
    return shipments;
  }

  if (filter === "in_transit") {
    // Include all statuses that are considered "in_transit"
    return shipments.filter((shipment) => {
      const status = shipment.status;
      return (
        status === "ASSIGNED" ||
        status === "PICKED_VENDOR" ||
        status === "DROPPED_WAREHOUSE" ||
        status === "PICKED_WAREHOUSE" ||
        status === "in_transit"
      );
    });
  }

  if (filter === "completed") {
    return shipments.filter(
      (shipment) =>
        shipment.status === "DELIVERED" || shipment.status === "completed"
    );
  }

  if (filter === "canceled") {
    return shipments.filter(
      (shipment) =>
        shipment.status === "CANCELLED" ||
        shipment.status === "FAILED" ||
        shipment.status === "canceled"
    );
  }

  // For other filters, match exact status
  return shipments.filter((shipment) => shipment.status === filter);
};

/**
 * Directions API Response
 */
export interface DirectionsResponse {
  data: {
    id: string;
    orderNo: string;
    status: ShipmentStatus;
    segment: ShipmentSegment;
    fromStopId: string;
    toStopId: string;
    fromLatitude: number;
    fromLongitude: number;
    toLatitude: number;
    toLongitude: number;
    fromLabel: string;
    toLabel: string;
    toAddress: string;
    distanceKm: number;
    etaSeconds: number;
    etaText: string;
    arrivalTimeIso: string;
    arrivalTimeLocal: string;
    polyline: string;
  };
}

/**
 * Accept Offer Request
 */
export interface AcceptOfferRequest {
  offerId: string;
}

/**
 * Accept Offer Response
 */
export interface AcceptOfferResponse {
  shipmentId: string;
  status: ShipmentStatus;
}

/**
 * Update Status Request
 */
export interface UpdateStatusRequest {
  status: ShipmentStatus;
  atStopId: string;
  note?: string;
}

/**
 * Update Status Response
 */
export interface UpdateStatusResponse {
  shipmentId: string;
  status: ShipmentStatus;
}
