export function setActiveHotel(activeHotel) {
  return {
    type: '@user/ACTIVE_HOTEL',
    payload: { activeHotel },
  };
}

export function setActiveHotelName(activeHotelName) {
  return {
    type: '@user/ACTIVE_HOTEL_NAME',
    payload: { activeHotelName },
  };
}
