const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.asscessToken,
      };
    case 'SIGNOUT':
      return {
        ...state,
        user: action.payload,
        accessToken: action.payload,
      };
    case 'GETLANE':
      console.log(action.payload.data);
      return {
        ...state,
        lane: action.payload.data,
      };
    case 'BOOKINGS':
      console.log(action.payload.data);
      return {
        ...state,
        totalBookings: action.payload.data,
      };
    case 'VIEWPARKINGSPACE':
      console.log('data', action.payload.data);
      return {
        ...state,
        parkingSpace: action.payload.data,
      };
    case 'BookedParking':
      return {
        ...state,
        parkingSpace: state.parkingSpace.map((parking) => {
          if (parking.id === action.payload.id) {
            return (parking = {
              ...parking,
              startTime: action.payload.startTime,
              endTime: action.payload.endTime,
            });
          }
          return parking;
        }),
      };
    case 'GETFEEDBACKS':
      console.log(action.payload.feedbacks);
      return {
        ...state,
        feedbacks: action.payload.feedbacks,
      };
    case 'REPLYFEEDBACK':
      console.log(action.payload);
      return {
        ...state,
        feedbackReply: action.payload.MSG,
      };
    case 'SENDMSG':
      return {
        ...state,
        feedbackReply: [...state.feedbackReply, action.payload.newMsg],
      };
    default:
      return state;
  }
};

export default reducer;
