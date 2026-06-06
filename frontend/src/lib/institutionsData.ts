export interface StudentData {
  name: string;
  completed: boolean;
  score: number;
}

export interface CourseData {
  students: StudentData[];
  average: number;
  helpTopic: string;
  helpCount: number;
  code: string;
  conceptMastery: { concept: string; mastery: number }[];
}

export const INSTITUTIONS = [
  "Visvesvaraya Technological University",
  "Delhi University",
  "Anna University",
  "University of Mumbai",
  "JNTU Hyderabad",
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kharagpur",
  "IIT Roorkee",
  "NIT Trichy",
  "NIT Surathkal",
  "BITS Pilani",
  "Vellore Institute of Technology",
  "SRM Institute of Science and Technology",
  "Manipal Institute of Technology",
  "Savitribai Phule Pune University",
  "MAKAUT (West Bengal)",
  "Osmania University",
  "Stanford University",
  "Massachusetts Institute of Technology",
  "Harvard University",
  "Oxford University",
  "Cambridge University",
  "Caltech",
  "Carnegie Mellon University",
  "CBSE Class 12 (NCERT)",
  "CBSE Class 10 (NCERT)",
  "ICSE Class 10",
  "ISC Class 12",
  "Karnataka State Board (PUC II)",
  "Maharashtra State Board (HSC)",
  "Tamil Nadu State Board (HSC)",
  "Delhi Public School",
  "The Doon School",
  "Kendriya Vidyalaya",
  "DAV Public School",
  "National Public School",
  "St. Xavier's College",
  "Loyola College"
];

export const COURSES: Record<string, string[]> = {
  "Visvesvaraya Technological University": [
    "CS301 - Data Structures",
    "CS302 - Analysis & Design of Algorithms",
    "CS401 - Operating Systems",
    "CS501 - Database Management Systems",
    "CS601 - Computer Networks"
  ],
  "Delhi University": [
    "CS101 - Introduction to Programming (Python)",
    "CS201 - Discrete Structures",
    "CS303 - Computer System Architecture",
    "CS403 - Software Engineering"
  ],
  "Anna University": [
    "CS401 - Object Oriented Programming (C++)",
    "CS402 - Database Management Systems",
    "CS403 - Computer Networks",
    "CS502 - Software Engineering"
  ],
  "University of Mumbai": [
    "IT201 - Data Structures & Analysis",
    "IT202 - Database Management Systems",
    "IT301 - Software Engineering",
    "IT401 - Computer Networks & Security"
  ],
  "JNTU Hyderabad": [
    "CSE401 - Database Management Systems",
    "CSE402 - Formal Languages & Automata Theory",
    "CSE403 - Computer Networks",
    "CSE501 - Design & Analysis of Algorithms"
  ],
  "IIT Bombay": [
    "CS101 - Computer Programming & Utilization",
    "CS213 - Data Structures and Algorithms",
    "CS218 - Design and Analysis of Algorithms",
    "CS347 - Operating Systems"
  ],
  "IIT Delhi": [
    "COL106 - Data Structures & Algorithms",
    "COL215 - Digital Logic & System Design",
    "COL331 - Operating Systems",
    "COL352 - Automata & Theory of Computation"
  ],
  "IIT Madras": [
    "CS2600 - Computer Organization",
    "CS2800 - Design and Analysis of Algorithms",
    "CS3500 - Operating Systems",
    "CS6100 - Foundations of Cryptography"
  ],
  "IIT Kharagpur": [
    "CS20001 - Programming and Data Structures",
    "CS20003 - Discrete Structures",
    "CS30001 - Database Management Systems",
    "CS30003 - Compilers"
  ],
  "IIT Roorkee": [
    "CSN-101 - Introduction to Computer Science",
    "CSN-102 - Data Structures",
    "CSN-201 - Object Oriented Programming",
    "CSN-202 - Operating Systems"
  ],
  "NIT Trichy": [
    "CS201 - Discrete Mathematics",
    "CS202 - Data Structures and Algorithms",
    "CS203 - Digital Systems",
    "CS204 - Computer Organization"
  ],
  "NIT Surathkal": [
    "CS200 - Computer Organization",
    "CS201 - Data Structures & Algorithms",
    "CS202 - Discrete Mathematical Structures"
  ],
  "BITS Pilani": [
    "CS F111 - Computer Programming",
    "CS F211 - Data Structures & Algorithms",
    "CS F213 - Object Oriented Programming",
    "CS F301 - Principles of Programming Languages"
  ],
  "Vellore Institute of Technology": [
    "CSE1001 - Problem Solving and Programming",
    "CSE1002 - Software Development",
    "CSE2001 - Computer Architecture and Organization",
    "CSE2002 - Data Structures and Algorithms"
  ],
  "SRM Institute of Science and Technology": [
    "15CS201 - Data Structures",
    "15CS202 - Computer Organization & Architecture",
    "15CS203 - Object Oriented Programming using C++"
  ],
  "Manipal Institute of Technology": [
    "ICT201 - Data Structures and Applications",
    "ICT202 - Relational Database Management Systems",
    "ICT301 - Computer Networks"
  ],
  "Savitribai Phule Pune University": [
    "CS111 - Problem Solving and Object Oriented Programming",
    "CS112 - Data Structures and Algorithms",
    "CS211 - Database Management Systems"
  ],
  "MAKAUT (West Bengal)": [
    "PCC-CS301 - Data Structure & Algorithms",
    "PCC-CS302 - Computer Architecture",
    "PCC-CS401 - Discrete Mathematics"
  ],
  "Osmania University": [
    "CS201 - Data Structures",
    "CS202 - Discrete Mathematics",
    "CS301 - Database Management Systems"
  ],
  "Stanford University": [
    "CS106A - Programming Methodology (Python)",
    "CS106B - Programming Abstractions (C++)",
    "CS107 - Computer Organization & Systems",
    "CS161 - Design and Analysis of Algorithms"
  ],
  "Massachusetts Institute of Technology": [
    "6.0001 - Intro to CS and Programming in Python",
    "6.006 - Introduction to Algorithms",
    "6.033 - Computer System Engineering",
    "6.036 - Intro to Machine Learning"
  ],
  "Harvard University": [
    "CS50 - Introduction to Computer Science",
    "CS51 - Abstraction and Design in Computation",
    "CS121 - Theoretical Computer Science"
  ],
  "Oxford University": [
    "CS1 - Imperative Programming",
    "CS2 - Design and Analysis of Algorithms",
    "CS3 - Functional Programming"
  ],
  "Cambridge University": [
    "IA - Foundations of Computer Science",
    "IB - Concurrent and Distributed Systems",
    "II - Artificial Intelligence"
  ],
  "Caltech": [
    "CS1 - Introduction to Computer Programming",
    "CS2 - Introduction to Programming Methods",
    "CS11 - Computer Language Shop"
  ],
  "Carnegie Mellon University": [
    "15-112 - Fundamentals of Programming and CS",
    "15-122 - Principles of Imperative Computation",
    "15-150 - Principles of Functional Programming",
    "15-210 - Parallel and Sequential Data Structures & Alg"
  ],
  "CBSE Class 12 (NCERT)": [
    "CS12 - Computer Science with Python",
    "IP12 - Informatics Practices",
    "MATH12 - Mathematics (Calculus)"
  ],
  "CBSE Class 10 (NCERT)": [
    "CS10 - Information Technology",
    "MATH10 - Mathematics (Algebra)"
  ],
  "ICSE Class 10": [
    "COMP10 - Computer Applications (Java)",
    "MATH10 - ICSE Mathematics"
  ],
  "ISC Class 12": [
    "COMP12 - Computer Science (Java & OOP)",
    "MATH12 - ISC Mathematics"
  ],
  "Karnataka State Board (PUC II)": [
    "CS21 - Computer Science (C++ Basics)",
    "MATH21 - Mathematics"
  ],
  "Maharashtra State Board (HSC)": [
    "CS1 - Computer Science Paper I",
    "CS2 - Computer Science Paper II"
  ],
  "Tamil Nadu State Board (HSC)": [
    "CS11 - Computer Science",
    "IP11 - Computer Applications"
  ],
  "Delhi Public School": [
    "K12-CS - Advanced Python Programming",
    "K12-WEB - Web Development Basics"
  ],
  "The Doon School": [
    "DS-CS - Computational Thinking",
    "DS-ROB - Robotics & IoT Basics"
  ],
  "Kendriya Vidyalaya": [
    "KV-CS - Python & Data Handling",
    "KV-MATH - Secondary Mathematics"
  ],
  "DAV Public School": [
    "DAV-CS - Foundation of IT",
    "DAV-MATH - Algebra & Geometry"
  ],
  "National Public School": [
    "NPS-CS - Java Programming & OOP",
    "NPS-WEB - Web Design & HTML5"
  ],
  "St. Xavier's College": [
    "BSC101 - Introduction to C Programming",
    "BSC102 - Mathematical Foundations of CS"
  ],
  "Loyola College": [
    "CS201 - Visual Programming",
    "CS202 - Relational Database Management Systems"
  ]
};

const STUDENT_NAMES = [
  "Rahul Sharma", "Priya Patel", "Amit Kumar", "Rohan Dev", "Simran Kaur",
  "Rohan Gupta", "Devansh Singh", "Shalini M", "Vijay Krishnan", "Aarav Mehta",
  "Diya Shah", "Kabir Sen", "Sneha Gupta", "Vikram Rao", "Karthik Raja",
  "Pooja Nair", "Anjali Joshi", "Suresh Iyer", "Mahesh Babu", "Neha Deshmukh"
];

const HELP_TOPICS = [
  "recursion", "dynamic programming", "list comprehensions", "pointers & dereferencing",
  "file handling", "Pandas dataframes", "SQL joins & indices", "loops & ranges",
  "variables & local scope", "class inheritance", "asynchronous callbacks", "binary search",
  "sorting algorithms", "exception handling", "dictionary hash collisions"
];

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateMockCourseData(courseName: string): CourseData {
  const hash = simpleHash(courseName);
  
  // Determine number of students: 3 to 6
  const numStudents = 3 + (hash % 4);
  const students: StudentData[] = [];
  
  let totalScore = 0;
  let completedCount = 0;
  
  for (let i = 0; i < numStudents; i++) {
    const nameIndex = (hash + i * 17) % STUDENT_NAMES.length;
    const name = STUDENT_NAMES[nameIndex];
    // Every student has a structured completed/pending flag based on index and hash
    const completed = ((hash + i) % 3) !== 0;
    let score = 0;
    
    if (completed) {
      score = 72 + ((hash + i * 13) % 27); // Realistic score between 72 and 98
      totalScore += score;
      completedCount++;
    }
    
    students.push({ name, completed, score });
  }
  
  const average = completedCount > 0 ? Math.round((totalScore / completedCount) * 10) / 10 : 75;
  
  // Pick a topic
  let helpTopic = HELP_TOPICS[hash % HELP_TOPICS.length];
  if (courseName.toLowerCase().includes("recursion")) {
    helpTopic = "recursion";
  } else if (courseName.toLowerCase().includes("data structure") || courseName.toLowerCase().includes("structure")) {
    helpTopic = "pointers & dereferencing";
  } else if (courseName.toLowerCase().includes("database") || courseName.toLowerCase().includes("sql")) {
    helpTopic = "SQL joins & indices";
  } else if (courseName.toLowerCase().includes("algorithm")) {
    helpTopic = "dynamic programming";
  } else if (courseName.toLowerCase().includes("python")) {
    helpTopic = "list comprehensions";
  }
  
  const helpCount = 1 + (hash % (numStudents - completedCount + 1 || 2));
  
  // Extract course code
  const codeParts = courseName.split(" - ");
  const code = codeParts.length > 0 ? codeParts[0].trim() : "CS101";

  // Create concept mastery data
  const concepts = ["Syntax & Syntax Rules", "Control Flow", "Object-Oriented Design", "Data Structures"];
  if (courseName.toLowerCase().includes("database") || courseName.toLowerCase().includes("sql")) {
    concepts[2] = "Relational Schema";
    concepts[3] = "Query Optimization";
  }
  const conceptMastery = concepts.map((concept, idx) => {
    const masteryVal = 50 + ((hash + idx * 23) % 46); // between 50 and 95
    return { concept, mastery: masteryVal };
  });

  return {
    students,
    average,
    helpTopic,
    helpCount,
    code,
    conceptMastery
  };
}
