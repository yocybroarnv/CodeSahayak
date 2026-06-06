import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, School, BarChart3, ChevronDown, Plus } from 'lucide-react';
import { useTranslation } from '@/store';
import { INSTITUTIONS, COURSES, generateMockCourseData } from '@/lib/institutionsData';

gsap.registerPlugin(ScrollTrigger);

interface StudentData {
  name: string;
  completed: boolean;
  score: number;
}

interface CourseData {
  students: StudentData[];
  average: number;
  helpTopic: string;
  helpCount: number;
}

const DATA_MAP: Record<string, CourseData> = {
  "CS301 - Data Structures": {
    students: [
      { name: 'Rahul Sharma', completed: true, score: 85 },
      { name: 'Priya Patel', completed: true, score: 92 },
      { name: 'Amit Kumar', completed: false, score: 0 }
    ],
    average: 78,
    helpTopic: "recursion",
    helpCount: 3
  },
  "CS302 - Analysis & Design of Algorithms": {
    students: [
      { name: 'Rahul Sharma', completed: true, score: 74 },
      { name: 'Rohan Dev', completed: true, score: 81 },
      { name: 'Priya Patel', completed: false, score: 0 }
    ],
    average: 77.5,
    helpTopic: "dynamic programming",
    helpCount: 2
  },
  "CS101 - Introduction to Programming (Python)": {
    students: [
      { name: 'Simran Kaur', completed: true, score: 95 },
      { name: 'Rohan Gupta', completed: true, score: 88 },
      { name: 'Devansh Singh', completed: false, score: 0 }
    ],
    average: 91.5,
    helpTopic: "list comprehensions",
    helpCount: 1
  },
  "CS201 - Discrete Structures": {
    students: [
      { name: 'Simran Kaur', completed: true, score: 79 },
      { name: 'Rohan Gupta', completed: false, score: 0 },
      { name: 'Devansh Singh', completed: false, score: 0 }
    ],
    average: 79,
    helpTopic: "graph theory",
    helpCount: 4
  },
  "CS401 - Object Oriented Programming (C++)": {
    students: [
      { name: 'Karthik Raja', completed: true, score: 88 },
      { name: 'Shalini M', completed: true, score: 90 },
      { name: 'Vijay Krishnan', completed: false, score: 0 }
    ],
    average: 89,
    helpTopic: "pointers",
    helpCount: 2
  },
  "CS402 - Database Management Systems": {
    students: [
      { name: 'Karthik Raja', completed: false, score: 0 },
      { name: 'Shalini M', completed: true, score: 93 },
      { name: 'Vijay Krishnan', completed: true, score: 85 }
    ],
    average: 89,
    helpTopic: "SQL joins",
    helpCount: 1
  },
  "CS12 - Computer Science with Python": {
    students: [
      { name: 'Aarav Mehta', completed: true, score: 94 },
      { name: 'Diya Shah', completed: true, score: 89 },
      { name: 'Kabir Sen', completed: false, score: 0 }
    ],
    average: 91.5,
    helpTopic: "file handling",
    helpCount: 2
  },
  "IP12 - Informatics Practices": {
    students: [
      { name: 'Aarav Mehta', completed: false, score: 0 },
      { name: 'Diya Shah', completed: true, score: 91 },
      { name: 'Kabir Sen', completed: true, score: 87 }
    ],
    average: 89,
    helpTopic: "Pandas dataframes",
    helpCount: 1
  }
};

export function TeachersSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [selectedInst, setSelectedInst] = useState("Visvesvaraya Technological University");
  const [selectedCourse, setSelectedCourse] = useState("CS301 - Data Structures");

  const [instSearch, setInstSearch] = useState("");
  const [instOpen, setInstOpen] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseOpen, setCourseOpen] = useState(false);

  const [customInstitutions, setCustomInstitutions] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<Record<string, string[]>>({});

  const instRef = useRef<HTMLDivElement>(null);
  const courseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (instRef.current && !instRef.current.contains(event.target as Node)) {
        setInstOpen(false);
      }
      if (courseRef.current && !courseRef.current.contains(event.target as Node)) {
        setCourseOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allInstitutions = [...INSTITUTIONS, ...customInstitutions];
  const filteredInstitutions = allInstitutions.filter(inst =>
    inst.toLowerCase().includes(instSearch.toLowerCase())
  );

  const currentInstCourses = [
    ...(COURSES[selectedInst] || []),
    ...(customCourses[selectedInst] || [])
  ];
  const filteredCourses = currentInstCourses.filter(course =>
    course.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const courseData = DATA_MAP[selectedCourse] || generateMockCourseData(selectedCourse);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(
        cardRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.4,
          },
        }
      );

      // Text animation
      gsap.fromTo(
        textRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Card UI elements stagger
      const uiElements = cardRef.current?.querySelectorAll('.ui-item') || [];
      gsap.fromTo(
        uiElements,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 35%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const bullets = [
    t('teachersBullet1'),
    t('teachersBullet2'),
    t('teachersBullet3'),
  ];

  return (
    <section
      ref={sectionRef}
      id="teachers"
      className="relative py-20 lg:py-28 bg-[#F0F4FA]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Lab Report Card */}
          <div ref={cardRef} className="card order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#2E86AB]/10 flex items-center justify-center">
                <School className="w-5 h-5 text-[#2E86AB]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1D2B]">{t('labReport')}</h3>
                <p className="text-sm text-[#5A6078]">{selectedCourse}</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* University Selector */}
              <div className={`ui-item relative ${instOpen ? 'z-30' : 'z-10'}`} ref={instRef}>
                <label className="block text-sm text-[#5A6078] mb-1">{t('university')}</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setInstOpen(!instOpen)}
                    className="w-full p-3 bg-[#F6F7FB] border border-transparent rounded-lg text-left text-[#1A1D2B] text-sm flex items-center justify-between hover:bg-[#F0F4FA] transition-all focus:outline-none focus:ring-2 focus:ring-[#2E86AB] cursor-pointer"
                  >
                    <span className="truncate">{selectedInst}</span>
                    <ChevronDown className={`w-4 h-4 text-[#5A6078] transition-transform ${instOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {instOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8EAF6] rounded-xl shadow-xl overflow-hidden animate-in fade-in duration-150">
                      <div className="p-2 border-b border-[#E8EAF6]">
                        <input
                          type="text"
                          placeholder="Search or add college/school..."
                          value={instSearch}
                          onChange={(e) => setInstSearch(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-[#F6F7FB] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                          autoFocus
                        />
                      </div>
                      <ul className="max-h-60 overflow-y-auto p-1 divide-y divide-gray-50">
                        {filteredInstitutions.length > 0 ? (
                          filteredInstitutions.map((inst) => (
                            <li key={inst}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedInst(inst);
                                  const courses = [
                                    ...(COURSES[inst] || []),
                                    ...(customCourses[inst] || [])
                                  ];
                                  if (courses.length > 0) {
                                    setSelectedCourse(courses[0]);
                                  } else {
                                    const defaultC = "CS101 - Coding Foundations";
                                    setCustomCourses(prev => ({ ...prev, [inst]: [defaultC] }));
                                    setSelectedCourse(defaultC);
                                  }
                                  setInstSearch("");
                                  setInstOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#2E86AB]/10 hover:text-[#2E86AB] transition-colors flex items-center justify-between ${
                                  selectedInst === inst ? 'bg-[#2E86AB]/5 text-[#2E86AB] font-semibold' : 'text-[#1A1D2B]'
                                }`}
                              >
                                <span className="truncate">{inst}</span>
                                {selectedInst === inst && <Check className="w-4 h-4 text-[#2E86AB] shrink-0 ml-2" />}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-center text-xs text-gray-400">No results found</li>
                        )}
                        
                        {instSearch.trim() && !allInstitutions.some(i => i.toLowerCase() === instSearch.trim().toLowerCase()) && (
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                const newInst = instSearch.trim();
                                setCustomInstitutions(prev => [...prev, newInst]);
                                setSelectedInst(newInst);
                                
                                const defaultC = "CS101 - Coding Foundations";
                                setCustomCourses(prev => ({ ...prev, [newInst]: [defaultC] }));
                                setSelectedCourse(defaultC);
                                
                                setInstSearch("");
                                setInstOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-[#2E86AB] hover:bg-[#2E86AB]/10 transition-colors font-medium flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4 shrink-0" />
                              <span className="truncate">Add "{instSearch.trim()}"</span>
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Syllabus Code */}
              <div className={`ui-item relative ${courseOpen ? 'z-20' : 'z-10'}`} ref={courseRef}>
                <label className="block text-sm text-[#5A6078] mb-1">{t('syllabusCode')}</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCourseOpen(!courseOpen)}
                    className="w-full p-3 bg-[#F6F7FB] border border-transparent rounded-lg text-left text-[#1A1D2B] font-mono text-sm flex items-center justify-between hover:bg-[#F0F4FA] transition-all focus:outline-none focus:ring-2 focus:ring-[#2E86AB] cursor-pointer"
                  >
                    <span className="truncate">{selectedCourse}</span>
                    <ChevronDown className={`w-4 h-4 text-[#5A6078] transition-transform ${courseOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {courseOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8EAF6] rounded-xl shadow-xl overflow-hidden animate-in fade-in duration-150">
                      <div className="p-2 border-b border-[#E8EAF6]">
                        <input
                          type="text"
                          placeholder="Search or add course..."
                          value={courseSearch}
                          onChange={(e) => setCourseSearch(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-[#F6F7FB] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                          autoFocus
                        />
                      </div>
                      <ul className="max-h-60 overflow-y-auto p-1 divide-y divide-gray-50">
                        {filteredCourses.length > 0 ? (
                          filteredCourses.map((course) => (
                            <li key={course}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setCourseSearch("");
                                  setCourseOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm font-mono rounded-lg hover:bg-[#2E86AB]/10 hover:text-[#2E86AB] transition-colors flex items-center justify-between ${
                                  selectedCourse === course ? 'bg-[#2E86AB]/5 text-[#2E86AB] font-semibold' : 'text-[#1A1D2B]'
                                }`}
                              >
                                <span className="truncate">{course}</span>
                                {selectedCourse === course && <Check className="w-4 h-4 text-[#2E86AB] shrink-0 ml-2" />}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-center text-xs text-gray-400">No results found</li>
                        )}
                        
                        {courseSearch.trim() && !currentInstCourses.some(c => c.toLowerCase() === courseSearch.trim().toLowerCase()) && (
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                const newCourse = courseSearch.trim();
                                setCustomCourses(prev => ({
                                  ...prev,
                                  [selectedInst]: [...(prev[selectedInst] || []), newCourse]
                                }));
                                setSelectedCourse(newCourse);
                                setCourseSearch("");
                                setCourseOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-[#2E86AB] hover:bg-[#2E86AB]/10 transition-colors font-medium flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4 shrink-0" />
                              <span className="truncate">Add "{courseSearch.trim()}"</span>
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Students List */}
              <div className="ui-item">
                <label className="block text-sm text-[#5A6078] mb-2">{t('students')}</label>
                <div className="space-y-2">
                  {courseData?.students.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-[#F6F7FB] rounded-lg animate-fade-in"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#2E86AB]/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-[#2E86AB]">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm text-[#1A1D2B]">{student.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {student.completed ? (
                          <>
                            <span className="text-sm font-medium text-[#2E86AB]">
                              {student.score}%
                            </span>
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-[#5A6078]">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Preview */}
              <div className="ui-item flex items-center gap-3 p-3 bg-[#2E86AB]/5 rounded-lg">
                <BarChart3 className="w-5 h-5 text-[#2E86AB]" />
                <div>
                  <p className="text-sm font-medium text-[#1A1D2B]">Class Average: {courseData?.average}%</p>
                  <p className="text-xs text-[#5A6078]">
                    {courseData?.helpCount} students need help with {courseData?.helpTopic}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Text Content */}
          <div ref={textRef} className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1D2B] mb-6">
              {t('teachersTitle')}
            </h2>

            <ul className="space-y-4 mb-8">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2E86AB]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#2E86AB]" />
                  </div>
                  <span className="text-[#5A6078]">{bullet}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/auth?tab=login&email=teacher@test.com&password=password')}
              className="btn-primary flex items-center gap-2"
            >
              {t('seeDashboard')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
