import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Service, BookingRequest } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export function useServices() {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useService(serviceId: string | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Service | null>({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      if (!actor || !serviceId) return null;
      try {
        return await actor.getService(BigInt(serviceId));
      } catch (error) {
        console.error('Error fetching service:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!serviceId,
  });
}

export function useRequestBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      serviceId,
      address,
      requestedDate,
    }: {
      serviceId: bigint;
      address: string;
      requestedDate: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.requestBooking(serviceId, address, requestedDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useUserBookings(userPrincipal: Principal | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<BookingRequest[]>({
    queryKey: ['bookings', userPrincipal?.toString()],
    queryFn: async () => {
      if (!actor || !userPrincipal) return [];
      return actor.getUserBookings(userPrincipal);
    },
    enabled: !!actor && !isFetching && !!userPrincipal,
  });
}
