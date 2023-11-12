import React from 'react';
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

