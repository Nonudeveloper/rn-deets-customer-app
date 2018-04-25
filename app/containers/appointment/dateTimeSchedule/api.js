const availabilty = {
    "user_service_appointment_id": 704,
    "technician": [
      {
        "technician_id": 10,
        "first_name": "Rupali",
        "last_name": "Mahajan",
        "image": "https://deetsmobile.s3.amazonaws.com/production/deetsapps3/user_image/rBvm1466072869103-userImage.jpg",
        "average_rating": 2,
        "interval": [
          "2018-04-19T08:00:00Z",
          "2018-04-19T08:30:00Z",
          "2018-04-19T09:00:00Z",
          "2018-04-19T09:30:00Z",
          "2018-04-19T10:00:00Z",
          "2018-04-19T10:30:00Z",
          "2018-04-19T11:00:00Z",
          "2018-04-19T11:30:00Z",
          "2018-04-19T12:00:00Z",
          "2018-04-19T12:30:00Z",
          "2018-04-19T13:00:00Z",
          "2018-04-19T13:30:00Z",
          "2018-04-19T14:00:00Z",
          "2018-04-19T14:30:00Z",
          "2018-04-19T15:00:00Z",
          "2018-04-19T15:30:00Z",
          "2018-04-19T16:00:00Z",
          "2018-04-19T16:30:00Z",
          "2018-04-19T17:00:00Z",
          "2018-04-19T17:30:00Z",
          "2018-04-19T18:00:00Z"
        ]
      },
      {
        "technician_id": 12,
        "first_name": "ASHISH",
        "last_name": "AGRAWAL",
        "image": "https://deetsmobile.s3.amazonaws.com/production/deetsapps3/user_image/technician_default.png",
        "average_rating": 0,
        "interval": [
          "2018-04-19T08:00:00Z",
          "2018-04-19T08:30:00Z",
          "2018-04-19T09:00:00Z",
          "2018-04-19T09:30:00Z",
          "2018-04-19T10:00:00Z",
          "2018-04-19T10:30:00Z",
          "2018-04-19T11:00:00Z",
          "2018-04-19T11:30:00Z",
          "2018-04-19T12:00:00Z",
          "2018-04-19T12:30:00Z",
          "2018-04-19T13:00:00Z",
          "2018-04-19T13:30:00Z",
          "2018-04-19T14:00:00Z",
          "2018-04-19T14:30:00Z",
          "2018-04-19T15:00:00Z",
          "2018-04-19T15:30:00Z",
          "2018-04-19T16:00:00Z",
          "2018-04-19T16:30:00Z",
          "2018-04-19T17:00:00Z",
          "2018-04-19T17:30:00Z",
          "2018-04-19T18:00:00Z"
        ]
      }
    ]
  };
  
  export const getAvailability =  () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(availabilty);
      }, 3000);
    });
  };

