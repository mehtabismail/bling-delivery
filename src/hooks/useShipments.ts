import { useGetShipmentsQuery } from "@/src/services/shipments/shipmentsApi";
import {
  Shipment,
  filterShipmentsByStatus,
  filterToTab,
} from "@/src/types/shipments";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseShipmentsOptions {
  filter: string;
  limit?: number;
  enabled?: boolean;
}

interface UseShipmentsReturn {
  shipments: Shipment[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  isLoadingMore: boolean;
}

/**
 * Custom hook for managing shipments with pagination and filtering
 *
 * Features:
 * - Automatic data fetching based on filter
 * - Infinite scroll pagination
 * - Client-side filtering for active shipments
 * - Optimized caching and refetching
 *
 * @param options - Hook configuration
 * @returns Shipments data and loading states
 */
export const useShipments = ({
  filter,
  limit = 20,
  enabled = true,
}: UseShipmentsOptions): UseShipmentsReturn => {
  // State for managing pagination
  const [allShipments, setAllShipments] = useState<Shipment[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Convert filter to API tab parameter
  const tab = useMemo(() => filterToTab(filter), [filter]);

  // Track which tab the current data belongs to (prevent using stale data from different tab)
  const dataTabRef = useRef<string | undefined>(tab);

  // Fetch shipments using RTK Query
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetShipmentsQuery(
      {
        tab,
        limit,
        cursor: isInitialLoad ? null : cursor,
      },
      {
        skip: !enabled,
        // Refetch on mount and when arguments change (including tab)
        refetchOnMountOrArgChange: true,
      }
    );

  // Reset when filter or tab changes
  useEffect(() => {
    const tabChanged = dataTabRef.current !== tab;

    if (tabChanged) {
      // Clear state immediately when tab changes
      setAllShipments([]);
      setCursor(null);
      setIsInitialLoad(true);
      dataTabRef.current = tab; // Update the ref to current tab
    }
  }, [filter, tab]);

  // Update all shipments when new data arrives
  // Only update if this is for the current tab (prevent stale data from previous tab)
  useEffect(() => {
    if (!data?.data) {
      // If no data and we're in initial load, ensure state is cleared
      if (isInitialLoad && dataTabRef.current === tab) {
        setAllShipments([]);
      }
      return;
    }

    // Only process data if it matches the current tab
    // This prevents using cached data from a different tab
    if (dataTabRef.current !== tab) {
      // Data is for a different tab, ignore it
      return;
    }

    setAllShipments((prev) => {
      // If this is initial load, replace all data (fresh fetch for new tab)
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return data.data;
      }

      // For subsequent loads (pagination), merge by ID
      const shipmentMap = new Map<string, Shipment>();

      // Start with previous shipments
      prev.forEach((shipment) => {
        shipmentMap.set(shipment.id, shipment);
      });

      // Update with new data (overwriting existing entries)
      data.data.forEach((shipment) => {
        shipmentMap.set(shipment.id, shipment);
      });

      return Array.from(shipmentMap.values());
    });
  }, [data, isInitialLoad, tab]); // Add tab as dependency to ensure we only use data for current tab

  // Check if there are more items to load
  const hasMore = useMemo(() => {
    return Boolean(data?.pagination?.nextCursor);
  }, [data?.pagination?.nextCursor]);

  // Load more items (infinite scroll)
  const loadMore = useCallback(() => {
    if (hasMore && !isFetching && data?.pagination?.nextCursor) {
      setCursor(data.pagination.nextCursor);
      setIsInitialLoad(false);
    }
  }, [hasMore, isFetching, data?.pagination?.nextCursor]);

  // Refresh data (pull to refresh)
  const refresh = useCallback(() => {
    setAllShipments([]);
    setCursor(null);
    setIsInitialLoad(true);
    refetch();
  }, [refetch]);

  // Apply client-side filtering for specific statuses
  const filteredShipments = useMemo(() => {
    // If tab is "active", we need to filter by specific status
    if (tab === "active") {
      return filterShipmentsByStatus(allShipments, filter);
    }
    // For other tabs, return all shipments
    return allShipments;
  }, [allShipments, tab, filter]);

  // Determine if we're loading more (not initial load)
  const isLoadingMore = isFetching && !isInitialLoad;

  return {
    shipments: filteredShipments,
    isLoading: isLoading && isInitialLoad,
    isFetching,
    isError,
    error,
    hasMore,
    loadMore,
    refresh,
    isLoadingMore,
  };
};
