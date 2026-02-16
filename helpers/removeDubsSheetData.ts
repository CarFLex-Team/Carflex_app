import { Car } from "@/components/Types/CarColumns";

export default function removeDubsSheetData(sheetData: Car[]): Car[] {
  const uniqueCars = new Map();

  // Iterate through the cars in sheetData
  sheetData.forEach((car) => {
    const { ad_link, updated_at } = car;

    // If the ad_link is already in the map, compare the updated_at timestamps
    if (uniqueCars.has(ad_link)) {
      const existingCar = uniqueCars.get(ad_link);

      // Keep the car with the most recent updated_at
      if (new Date(updated_at) > new Date(existingCar.updated_at)) {
        uniqueCars.set(ad_link, car);
      }
    } else {
      // If the car is not in the map, add it
      uniqueCars.set(ad_link, car);
    }
  });

  // Return the final array with unique cars based on ad_link and most recent updated_at
  return Array.from(uniqueCars.values());
}
