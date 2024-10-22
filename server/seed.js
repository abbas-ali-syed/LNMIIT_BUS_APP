// import mongoose from "mongoose";
// import Day from "./models/busModel.js";

// export const seedDays = async () => {
  
    

//     const schedules = { 
//         "Monday": [
//           { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 50, capacity: 100, time: "06:00 AM" },
//           { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
//           { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
//           { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
//           { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
//           { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
//           { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
//           { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
//           { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
//           { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
//           { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
//           { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
//         ],
//         "Tuesday": [
//           { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
//           { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 50, capacity: 100, time: "07:00 AM" },
//           { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
//           { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 50, capacity: 100, time: "10:00 AM" },
//           { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
//           { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
//           { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 50, capacity: 100, time: "03:45 PM" },
//           { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
//           { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
//           { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
//           { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
//           { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
//           { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
//         ],
//         "Wednesday": [
//           { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
//           { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
//           { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
//           { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
//           { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
//           { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
//           { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
//           { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
//           { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
//           { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
//           { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
//           { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
//         ],
//         "Thursday": [
//           { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
//           { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
//           { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
//           { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
//           { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
//           { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
//           { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
//           { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
//           { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
//           { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
//           { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
//           { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
//         ],
//         "Friday": [
//           { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
//           { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
//           { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
//           { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
//           { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
//           { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
//           { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
//           { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
//           { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
//           { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
//           { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
//           { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
//         ],
//         "Saturday": [
//           { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
//           { id: 3, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:30 AM" },
//           { id: 4, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
//           { id: 5, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
//           { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "01:00 PM" },
//           { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "02:00 PM" },
//           { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:00 PM" },
//           { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "04:00 PM" },
//           { id: 10, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:00 PM" },
//           { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:15 PM" },
//           { id: 12, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
//           { id: 13, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "06:30 PM" },
//           { id: 14, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "07:45 PM" },
//           { id: 15, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
//           { id: 16, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
//         ],
//         "Sunday": [
//           { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
//           { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
//           { id: 3, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:30 AM" },
//           { id: 4, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
//           { id: 5, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
//           { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "01:00 PM" },
//           { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "02:00 PM" },
//           { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:00 PM" },
//           { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "04:00 PM" },
//           { id: 10, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:00 PM" },
//           { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:15 PM" },
//           { id: 12, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
//           { id: 13, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "06:30 PM" },
//           { id: 14, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "07:45 PM" },
//           { id: 15, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
//           { id: 16, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
//         ]
//       };
      
//       try {
//         for (const [day, scheduleArray] of Object.entries(schedules)) {
//             const daySchedule = new Day({ day, schedules: scheduleArray });
//             await daySchedule.save();
//             console.log(`Seeded schedules for ${day}`);
//         }
//         console.log("All schedules seeded successfully!");
//     } catch (error) {
//         console.error("Error seeding schedules:", error);
//     }
    
// };

// // Call the seed function
// seedDays();
