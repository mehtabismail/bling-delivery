import {
  AcceptOfferRequest,
  AcceptOfferResponse,
  DirectionsResponse,
  ShipmentsApiResponse,
  ShipmentsQueryParams,
  ShipmentsResponse,
  UpdateStatusRequest,
  UpdateStatusResponse,
} from "@/src/types/shipments";
import { api } from "../api";
import { apiEndpoints } from "../endpoints";

/**
 * Shipments API endpoints using RTK Query
 * Handles fetching shipments with pagination and tab filtering
 */
export const shipmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get shipments with pagination and filtering
     */
    getShipments: builder.query<ShipmentsResponse, ShipmentsQueryParams>({
      query: ({ tab, limit = 20, cursor }) => {
        // Build query parameters
        const params = new URLSearchParams();

        if (tab && tab !== "all") {
          params.append("tab", tab);
        }

        params.append("limit", limit.toString());

        if (cursor) {
          params.append("cursor", cursor);
        }

        return {
          url: `${apiEndpoints.shipments}?${params.toString()}`,
          method: "GET",
        };
      },
      // Transform response to extract data and pagination from wrapped API response
      transformResponse: (
        response: ShipmentsApiResponse
      ): ShipmentsResponse => {
        return {
          data: response.data || [],
          pagination: response.pagination,
        };
      },
      // Provide tags for cache invalidation
      providesTags: (result, error, arg) => {
        // Always include a generic LIST tag plus tab/cursor-specific tag
        const tags = [
          { type: "Shipments" as const, id: "LIST" },
          { type: "Shipments" as const, id: `${arg.tab}-${arg.cursor}` },
        ];

        // Also include individual shipment IDs if available
        if (result?.data?.length) {
          result.data.forEach((shipment) => {
            tags.push({
              type: "Shipments" as const,
              id: `shipment-${shipment.id}`,
            });
          });
        }

        return tags;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          if (
            response.meta?.response?.status === 200 ||
            response.meta?.response?.status === 201
          ) {
            // console.log("Shipments listing api successfull:", response.data);
            // Store user data and token
          }
        } catch (error: any) {
          console.log("error in shipment api : ", error?.error?.data);
        }
      },
      // Keep unused data for 60 seconds
      keepUnusedDataFor: 60,
    }),

    /**
     * Get directions for a shipment
     */
    getDirections: builder.query<DirectionsResponse, string>({
      query: (shipmentId) => ({
        url: apiEndpoints.getDirections(shipmentId),
        method: "GET",
      }),
      // Transform response - API might return wrapped format
      transformResponse: (response: any): DirectionsResponse => {
        // If response has data property, use it; otherwise assume response is already DirectionsResponse
        if (response?.data) {
          return response;
        }
        // If response is the data directly, wrap it
        return { data: response };
      },
      providesTags: (result, error, shipmentId) => [
        { type: "Shipments" as const, id: `directions-${shipmentId}` },
      ],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          if (
            response.meta?.response?.status === 200 ||
            response.meta?.response?.status === 201
          ) {
            console.log("get directions api :", response.data);
            // Store user data and token
          }
        } catch (error: any) {
          console.log("error in directions api : ", error?.error?.data);
        }
      },
    }),

    /**
     * Accept an offer for a shipment
     */
    acceptOffer: builder.mutation<
      AcceptOfferResponse,
      { shipmentId: string; body: AcceptOfferRequest }
    >({
      query: ({ shipmentId, body }) => ({
        url: apiEndpoints.acceptOffer(shipmentId),
        method: "POST",
        body,
      }),
      // Invalidate shipments cache to refetch updated data
      // When offer is accepted, status changes to ASSIGNED, so it should appear in "in_transit" (active) tab
      invalidatesTags: (result, error, arg) => [
        { type: "Shipments" as const, id: "LIST" },
        { type: "Shipments" as const, id: `shipment-${arg.shipmentId}` },
        { type: "Shipments" as const }, // Invalidate all shipments queries
        { type: "Shipments" as const, id: `directions-${arg.shipmentId}` },
        // Invalidate specific tabs to ensure fresh data appears in both offers and in_transit tabs
        { type: "Shipments" as const, id: "offers" },
        { type: "Shipments" as const, id: "active" }, // in_transit tab uses "active" API tab
      ],
    }),

    /**
     * Update shipment status
     */
    updateStatus: builder.mutation<
      UpdateStatusResponse,
      { shipmentId: string; body: UpdateStatusRequest }
    >({
      query: ({ shipmentId, body }) => ({
        url: apiEndpoints.updateStatus(shipmentId),
        method: "PATCH",
        body,
      }),
      // Invalidate shipments cache to refetch updated data
      invalidatesTags: (result, error, arg) => [
        { type: "Shipments" as const, id: "LIST" },
        { type: "Shipments" as const, id: `shipment-${arg.shipmentId}` },
        { type: "Shipments" as const },
        { type: "Shipments" as const, id: `directions-${arg.shipmentId}` },
      ],
    }),
  }),
  overrideExisting: true,
});

// Export hooks for usage in components
export const {
  useGetShipmentsQuery,
  useLazyGetShipmentsQuery,
  useGetDirectionsQuery,
  useAcceptOfferMutation,
  useUpdateStatusMutation,
} = shipmentsApi;

// Update tag types in main API
declare module "../api" {
  interface TagTypes {
    Shipments: "Shipments";
  }
}
