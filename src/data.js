import avatar1 from "./avatars/avatar_1.jpg"
import avatar2 from "./avatars/avatar_2.jpg"
import avatar3 from "./avatars/avatar_3.jpg"
import avatar4 from "./avatars/avatar_4.jpg"
import avatar5 from "./avatars/avatar_5.jpg"
import avatar6 from "./avatars/avatar_6.jpg"
import avatar7 from "./avatars/avatar_7.jpg"
import avatar8 from "./avatars/avatar_8.jpg"
import avatar9 from "./avatars/avatar_9.jpg"
import avatar10 from "./avatars/avatar_10.jpg"
import avatar11 from "./avatars/avatar_11.jpg"
import avatar12 from "./avatars/avatar_12.jpg"
import avatar13 from "./avatars/avatar_13.jpg"
import avatar14 from "./avatars/avatar_14.jpg"
import avatar15 from "./avatars/avatar_15.jpg"
import avatar16 from "./avatars/avatar_16.jpg"
import avatar17 from "./avatars/avatar_17.jpg"
import avatar18 from "./avatars/avatar_18.jpg"
import avatar19 from "./avatars/avatar_19.jpg"
import avatar20 from "./avatars/avatar_20.jpg"
import avatar21 from "./avatars/avatar_21.jpg"
import avatar22 from "./avatars/avatar_22.jpg"
import avatar23 from "./avatars/avatar_23.jpg"
import avatar24 from "./avatars/avatar_24.jpg"
import avatar25 from "./avatars/avatar_25.jpg"

export const rollNumberData = {};
const images = [
    avatar1, avatar2, avatar3, avatar4, avatar5,
    avatar6, avatar7, avatar8, avatar9, avatar10,
    avatar11, avatar12, avatar13, avatar14, avatar15,
    avatar16, avatar17, avatar18, avatar19, avatar20,
    avatar21, avatar22, avatar23, avatar24, avatar25
  ];
const names = [
  'Aarav Patel', 'Riya Gupta', 'Arjun Singh', 'Ananya Desai', 'Aryan Sharma',
  'Naina Verma', 'Rohan Kapoor', 'Avani Reddy', 'Vihaan Mehta', 'Aisha Joshi',
  'Kabir Kumar', 'Esha Malhotra', 'Advait Khanna', 'Kavya Patel', 'Dev Sharma',
  'Zara Singh', 'Virat Kapoor', 'Diya Shah', 'Ishaan Patel', 'Ayesha Nair',
  'Amit Verma', 'Ria Sharma', 'Aryan Malhotra', 'Mira Patel', 'Vikram Kapoor',
  'Aditi Desai', 'Kunal Sharma', 'Ishita Reddy', 'Karan Mehta', 'Asha Gupta',
  'Aarush Joshi', 'Nisha Kapoor', 'Rahul Kumar', 'Sanya Verma', 'Arnav Singh',
  'Ritu Nair', 'Rohit Sharma', 'Simran Malhotra', 'Kunal Kapoor', 'Kavita Patel',
  'Sahil Desai', 'Tanvi Joshi', 'Raj Mehta', 'Pooja Nair', 'Vivek Singh',
  'Kritika Shah', 'Amit Malhotra', 'Neha Reddy', 'Rajat Joshi', 'Mansi Gupta',
  'Ravi Kapoor', 'Sapna Sharma', 'Aryan Singh', 'Ishika Patel', 'Rohini Kumar',
  'Karan Malhotra', 'Neeta Verma', 'Raj Sharma', 'Divya Kapoor', 'Akash Joshi',
];

for (let rollNumber = 1; rollNumber <= 60; rollNumber++) {
  const avatarNumber = (rollNumber % 25) || 25;
  rollNumberData[rollNumber] = {
    name: names[rollNumber - 1] || 'Unknown',
    avatar: images[avatarNumber-1], 
  }
}

export const getCategoryColor = (category) => {
  switch (category) {
      case 'Work':
          return {
              'borderColor': 'transparent',
              'color': 'rgb(145, 85, 253)',
              'backgroundColor': ' rgba(145, 85, 253, 0.12)'
          };
      case 'Personal':
          return {
              'borderColor': 'transparent',
              'color': 'rgb(255, 76, 81)',
              'backgroundColor': 'rgba(255, 76, 81, 0.12)'
          };
      case 'Holiday':
          return {
              'borderColor': 'transparent',
              'color': 'rgb(86, 202, 0)',
              'backgroundColor': 'rgba(86, 202, 0, 0.12)'
          };
      case 'Other':
          return {
              'borderColor': 'transparent',
              'color': 'rgb(22, 177, 255)',
              'backgroundColor': 'rgba(22, 177, 255, 0.12)'
          };
      case 'Family':
          return {
              'borderColor': 'transparent',
              'color': 'rgb(255, 180, 0)',
              'backgroundColor': 'rgba(255, 180, 0, 0.12)'
          };
      default:
          return {
              'borderColor': 'transparent',
              'color': 'rgba(58, 53, 65, 0.8)',
              'backgroundColor': 'rgba(58, 53, 65, 0.12)'
          };
  }
};

export const dummyEvents = [
  {
      title: 'Marks submission',
      category: 'Work',
      start: new Date('2023-11-15T09:00:00'),
      end: new Date('2023-11-15T12:00:00'),
      allDay: false
  },
  {
    title: 'Update Attendance',
    category: 'Work',
    start: new Date('2023-11-30T09:00:00'),
    end: new Date('2023-11-30T12:00:00'),
    allDay: false
  },
  {
    title: 'Update Attendance',
    category: 'Work',
    start: new Date('2023-10-31T09:00:00'),
    end: new Date('2023-10-31T12:00:00'),
    allDay: false
  },
  {
      title: 'Party',
      category: 'Personal',
      start: new Date('2023-11-19T14:00:00'),
      end: new Date('2023-11-19T17:00:00'),
      allDay: false
  },
  {
      title: 'Shimla Trip',
      category: 'Family',
      start: new Date('2023-12-04T14:00:00'),
      end: new Date('2023-12-07T17:00:00'),
      allDay: true
  },
  {
      title: "children's Day",
      category: 'Holiday',
      start: new Date('2023-11-14T00:00:00'),
      end: new Date('2023-11-14T23:59:59'),
      allDay: true
  },
  {
    title: "Christmas",
    category: 'Holiday',
    start: new Date('2023-12-25T00:00:00'),
    end: new Date('2023-12-25T23:59:59'),
    allDay: true
   },
  {
    title: "Meeting Day",
    category: 'Work',
    start: new Date('2023-11-20T00:00:00'),
    end: new Date('2023-11-20T23:59:59'),
    allDay: false
  },
  {
    title: "Gym",
    category: 'Personal',
    start: new Date('2023-11-18T00:00:00'),
    end: new Date('2023-11-18T23:59:59'),
    allDay: true
  },
  {
      title: "Slip Test",
      category: 'Work',
      start: new Date('2023-11-23T21:00:00'),
      end: new Date('2023-11-23T21:59:59'),
      allDay: false
  }
];

export const dummyHistory = [
    {"studentId":"25","type":"semester-1","grade":"8.73"},
    {"studentId":"24","type":"semester-1","grade":"8.67"},
    {"studentId":"23","type":"semester-2","grade":"7.75"},
    {"studentId":"13","type":"semester-2","grade":"7.75"},
    {"studentId":"15","type":"semester-1","grade":"8.57"},
    {"studentId":"23","type":"semester-2","grade":"7.13"},
    {"studentId":"21","type":"semester-1","grade":"8.57"},
    {"studentId":"14","type":"semester-2","grade":"8.50"},
    {"studentId":"15","type":"CGPA","grade":"9.00"},
    {"studentId":"51","type":"CGPA","grade":"9.00"},
    {"studentId":"25","type":"CGPA","grade":"9.00"},
    {"studentId":"23","type":"CGPA","grade":"8.69"},
    {"studentId":"21","type":"CGPA","grade":"8.30"},
    {"studentId":"23","type":"semester-2","grade":"7.13"},
]

export const notifications = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Liked your post!',
    avatar: avatar12,
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    id: 2,
    sender: 'Jane Smith',
    message: 'Tagged you in a photo',
    avatar: avatar10,
    timestamp: '1 hour ago',
    isRead: true,
  },
  {
    id: 3,
    sender: 'Ruther',
    message: 'Meeting tomorrow at 2:00 PM',
    avatar: avatar24,
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: 4,
    sender: 'Dong Lee',
    message: 'Check out the latest features in app!',
    avatar: avatar19,
    timestamp: '1 day ago',
    isRead: false,
  },
  {
    id: 5,
    sender: 'Alice Wonderland',
    message: 'Received your message',
    avatar: avatar7,
    timestamp: '3 days ago',
    isRead: true,
  },
  {
    id: 6,
    sender: 'Bob Builder',
    message: 'Your order has been shipped',
    avatar: avatar14,
    timestamp: '5 days ago',
    isRead: false,
  },
];