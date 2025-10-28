export interface Package {
  id: string;
  packageNumber: string;
  customerName: string;
  fromAddress: string;
  toAddress: string;
  status: "waiting" | "in_transit" | "completed" | "canceled";
  departureDate?: string;
  destination: string; // This is the "Center" field as requested
  progress?: number; // For progress bar (0-100)
}

export const mockPackages: Package[] = [
  {
    id: "1",
    packageNumber: "#324561324",
    customerName: "Abdullah Ahmed",
    fromAddress: "24 Kilmer Rd #445 Street",
    toAddress: "24 Kilmer Rd #445 Beach Street",
    status: "in_transit",
    departureDate: "16Apr,2025",
    destination: "Center",
    progress: 65,
  },
  {
    id: "2",
    packageNumber: "#324561325",
    customerName: "Abdullah Ahmed",
    fromAddress: "24 Kilmer Rd #445 Street",
    toAddress: "24 Kilmer Rd #445 Beach Street",
    status: "waiting",
    destination: "Center",
  },
  {
    id: "3",
    packageNumber: "#324561326",
    customerName: "Sarah Johnson",
    fromAddress: "15 Main St #200 Avenue",
    toAddress: "15 Main St #200 Beach Avenue",
    status: "in_transit",
    departureDate: "15Apr,2025",
    destination: "Center",
    progress: 45,
  },
  {
    id: "4",
    packageNumber: "#324561327",
    customerName: "Michael Brown",
    fromAddress: "42 Oak St #100 Road",
    toAddress: "42 Oak St #100 Beach Road",
    status: "completed",
    departureDate: "14Apr,2025",
    destination: "Center",
    progress: 100,
  },
  {
    id: "5",
    packageNumber: "#324561328",
    customerName: "Emma Wilson",
    fromAddress: "78 Pine Ave #300 Lane",
    toAddress: "78 Pine Ave #300 Beach Lane",
    status: "canceled",
    destination: "Center",
  },
  {
    id: "6",
    packageNumber: "#324561329",
    customerName: "David Lee",
    fromAddress: "56 Elm St #150 Drive",
    toAddress: "56 Elm St #150 Beach Drive",
    status: "waiting",
    destination: "Center",
  },
];

// Mock user profile data
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
}

export const mockUserProfile: UserProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1 234 567 8900",
  avatar: undefined, // Will use default avatar
};
