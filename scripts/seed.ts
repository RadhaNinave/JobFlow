import "dotenv/config";
import bcrypt from "bcryptjs";

import { connectDB } from "../lib/db";
import User from "../models/User";
import Job from "../models/Job";

const admins = [
  {
    name: "JobFlow Admin",
    email: "admin1@jobflow.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    name: "JobFlow Manager",
    email: "admin2@jobflow.com",
    password: "Admin@123",
    role: "admin",
  },
];

const users = [
  {
    name: "Rahul Sharma",
    email: "user1@jobflow.com",
    password: "User@123",
  },
  {
    name: "Priya Patel",
    email: "user2@jobflow.com",
    password: "User@123",
  },
  {
    name: "Amit Shah",
    email: "user3@jobflow.com",
    password: "User@123",
  },
  {
    name: "Neha Mehta",
    email: "user4@jobflow.com",
    password: "User@123",
  },
  {
    name: "Karan Joshi",
    email: "user5@jobflow.com",
    password: "User@123",
  },
  {
    name: "Anjali Desai",
    email: "user6@jobflow.com",
    password: "User@123",
  },
  {
    name: "Rohan Verma",
    email: "user7@jobflow.com",
    password: "User@123",
  },
  {
    name: "Sneha Shah",
    email: "user8@jobflow.com",
    password: "User@123",
  },
  {
    name: "Vikas Patel",
    email: "user9@jobflow.com",
    password: "User@123",
  },
  {
    name: "Pooja Mehta",
    email: "user10@jobflow.com",
    password: "User@123",
  },
];

const jobs = [
  {
    title: "Frontend Developer",
    company: "Nova Labs",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    salary: "₹6–10 LPA",
    skills: ["React", "Next.js", "TypeScript"],
    description:
      "Build modern and responsive web applications using React and Next.js.",
  },
  {
    title: "Node.js Developer",
    company: "Orbit Systems",
    location: "Remote - India",
    type: "Full-time",
    salary: "₹8–12 LPA",
    skills: ["Node.js", "Express", "MongoDB"],
    description:
      "Develop scalable backend APIs and services for high-growth applications.",
  },
  {
    title: "MERN Stack Developer",
    company: "TechVista",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    salary: "₹7–12 LPA",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Work across the complete MERN stack and build production-ready features.",
  },
  {
    title: "React Developer",
    company: "PixelCraft",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹6–11 LPA",
    skills: ["React", "JavaScript", "Redux"],
    description:
      "Create reusable UI components and improve frontend application performance.",
  },
  {
    title: "Backend Developer",
    company: "CloudBridge",
    location: "Remote - India",
    type: "Full-time",
    salary: "₹9–14 LPA",
    skills: ["Node.js", "PostgreSQL", "REST API"],
    description:
      "Build secure REST APIs and backend services for enterprise applications.",
  },
  {
    title: "Full Stack Engineer",
    company: "CodeNest",
    location: "Pune, Maharashtra",
    type: "Full-time",
    salary: "₹10–16 LPA",
    skills: ["React", "Node.js", "MongoDB"],
    description:
      "Develop end-to-end features across frontend, backend and database layers.",
  },
  {
    title: "Next.js Developer",
    company: "BrightApps",
    location: "Remote - India",
    type: "Full-time",
    salary: "₹8–13 LPA",
    skills: ["Next.js", "React", "TypeScript"],
    description:
      "Build fast and scalable applications using the latest Next.js architecture.",
  },
  {
    title: "Software Engineer",
    company: "InnovaWorks",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    salary: "₹7–12 LPA",
    skills: ["JavaScript", "Node.js", "React"],
    description:
      "Work with a product engineering team to build reliable software solutions.",
  },
  {
    title: "API Developer",
    company: "DataFlow Technologies",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹8–13 LPA",
    skills: ["Node.js", "Express", "MongoDB"],
    description:
      "Design and maintain RESTful APIs with a focus on security and performance.",
  },
  {
    title: "Junior Full Stack Developer",
    company: "WebSphere",
    location: "Gandhinagar, Gujarat",
    type: "Full-time",
    salary: "₹4–7 LPA",
    skills: ["React", "Node.js", "MongoDB"],
    description:
      "Join a collaborative engineering team and contribute to real-world web products.",
  },
];

async function seed() {
  try {
    await connectDB();

    console.log("MongoDB connected");

    // --------------------------------
    // ADMINS
    // --------------------------------

    const createdAdmins = [];

    for (const adminData of admins) {
      const password = await bcrypt.hash(adminData.password, 10);

      const admin = await User.findOneAndUpdate(
        { email: adminData.email },
        {
          name: adminData.name,
          email: adminData.email,
          password,
          role: "admin",
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      createdAdmins.push(admin);

      console.log(`Admin ready: ${admin.email}`);
    }

    // --------------------------------
    // USERS
    // --------------------------------

    for (const userData of users) {
      const password = await bcrypt.hash(userData.password, 10);

      const user = await User.findOneAndUpdate(
        { email: userData.email },
        {
          name: userData.name,
          email: userData.email,
          password,
          role: "user",
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      console.log(`User ready: ${user.email}`);
    }

    // --------------------------------
    // JOBS
    // --------------------------------

    // Remove previously seeded jobs.
    // This prevents duplicate jobs every time you run the seeder.
    await Job.deleteMany({
      createdBy: {
        $in: createdAdmins.map((admin) => admin._id),
      },
    });

    // All jobs belong to the first admin
    const jobOwner = createdAdmins[0]._id;

    const jobDocuments = jobs.map((job) => ({
      ...job,
      createdBy: jobOwner,
      isOpen: true,
    }));

    await Job.insertMany(jobDocuments);

    console.log("10 jobs created");

    // --------------------------------
    // SUMMARY
    // --------------------------------

    console.log("\n==============================");
    console.log("       JOBFLOW SEED DONE");
    console.log("==============================");

    console.log("\nADMIN LOGIN");
    console.log("------------------------------");
    console.log("admin1@jobflow.com / Admin@123");
    console.log("admin2@jobflow.com / Admin@123");

    console.log("\nUSER LOGIN");
    console.log("------------------------------");

    users.forEach((user) => {
      console.log(`${user.email} / ${user.password}`);
    });

    console.log("\nDATA");
    console.log("------------------------------");
    console.log(`Admins: ${await User.countDocuments({ role: "admin" })}`);
    console.log(`Users: ${await User.countDocuments({ role: "user" })}`);
    console.log(`Jobs: ${await Job.countDocuments()}`);

    console.log("\n==============================\n");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();