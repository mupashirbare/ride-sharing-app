import { getDistance } from "geolib";

export const calculateFare = (pickup, dropOff) => {
  const distanceInMeters = getDistance(
    { latitude: pickup.latitude, longitude: pickup.longitude },
    { latitude: dropOff.latitude, longitude: dropOff.longitude }
  );

  const distanceInKm = distanceInMeters / 1000;

  const baseFare = 2; // flat rate in USD
  const perKmRate = 1.5; // $ per km

  const totalFare = baseFare + distanceInKm * perKmRate;

  return Math.round(totalFare * 100) / 100; // round to 2 decimals
};
