import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    id: bigint;
    name: string;
    description: string;
    pricePerVisit: bigint;
}
export interface BookingRequest {
    id: bigint;
    status: string;
    user: Principal;
    address: string;
    requestedDate: string;
    serviceId: bigint;
}
export interface backendInterface {
    addService(name: string, description: string, pricePerVisit: bigint): Promise<void>;
    getAllBookings(): Promise<Array<BookingRequest>>;
    getService(serviceId: bigint): Promise<Service>;
    getServices(): Promise<Array<Service>>;
    getUserBookings(user: Principal): Promise<Array<BookingRequest>>;
    requestBooking(serviceId: bigint, address: string, requestedDate: string): Promise<void>;
}
