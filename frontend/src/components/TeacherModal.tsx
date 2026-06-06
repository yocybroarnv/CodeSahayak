import { useState, useEffect, useRef } from 'react';
import { School, BookOpen, BarChart3, Check, Users, Plus, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/store';
import { useUIStore } from '@/store/uiStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { INSTITUTIONS, COURSES, generateMockCourseData } from '@/lib/institutionsData';

export function TeacherModal() {
  const { t } = useTranslation();
  const { isTeacherModalOpen, closeTeacherModal } = useUIStore();
  
  const [selectedInst, setSelectedInst] = useState("Visvesvaraya Technological University");
  const [selectedCourse, setSelectedCourse] = useState("CS301 - Data Structures");

  const [instSearch, setInstSearch] = useState("");
  const [instOpen, setInstOpen] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseOpen, setCourseOpen] = useState(false);

  const [customInstitutions, setCustomInstitutions] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<Record<string, string[]>>({});

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'analytics'>('overview');

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

  const courseData = generateMockCourseData(selectedCourse);

  const completedCount = courseData.students.filter(s => s.completed).length;
  const completionRate = courseData.students.length > 0
    ? Math.round((completedCount / courseData.students.length) * 100)
    : 0;

  const handleGenerateReport = () => {
    toast.success('Lab report generated successfully!', {
      description: `Generated for ${selectedInst} - ${selectedCourse}`,
    });
  };

  return (
    <Dialog open={isTeacherModalOpen} onOpenChange={closeTeacherModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-[#1A1D2B] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E86AB]/10 flex items-center justify-center">
              <School className="w-5 h-5 text-[#2E86AB]" />
            </div>
            {t('teachersTitle')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          {/* selectors wrapper */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* University Selector */}
            <div ref={instRef} className={`relative ${instOpen ? 'z-40' : 'z-20'}`}>
              <label className="block text-sm font-medium text-[#5A6078] mb-2">
                {t('university')}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setInstOpen(!instOpen)}
                  className="w-full p-3 bg-[#F6F7FB] border border-[#E8EAF6] rounded-lg text-left text-[#1A1D2B] text-sm flex items-center justify-between hover:bg-[#F0F4FA] transition-all focus:outline-none focus:ring-2 focus:ring-[#2E86AB] cursor-pointer"
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
                    <ul className="max-h-48 overflow-y-auto p-1 divide-y divide-gray-50">
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

            {/* Syllabus Course Selector */}
            <div ref={courseRef} className={`relative ${courseOpen ? 'z-30' : 'z-10'}`}>
              <label className="block text-sm font-medium text-[#5A6078] mb-2">
                Course selection / Syllabus
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCourseOpen(!courseOpen)}
                  className="w-full p-3 bg-[#F6F7FB] border border-[#E8EAF6] rounded-lg text-left text-[#1A1D2B] font-mono text-sm flex items-center justify-between hover:bg-[#F0F4FA] transition-all focus:outline-none focus:ring-2 focus:ring-[#2E86AB] cursor-pointer"
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
                    <ul className="max-h-48 overflow-y-auto p-1 divide-y divide-gray-50">
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
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#2E86AB] text-white shadow-md'
                    : 'bg-[#F0F4FA] text-[#5A6078] hover:bg-[#2E86AB]/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-[#F6F7FB] rounded-xl p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-[#5A6078] font-medium">Syllabus Code</p>
                    <p className="text-lg font-bold text-[#1A1D2B] mt-1 font-mono">{courseData.code}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-[#5A6078] font-medium">Total Students</p>
                    <p className="text-lg font-bold text-[#1A1D2B] mt-1">{courseData.students.length}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-[#5A6078] font-medium">Completion Rate</p>
                    <p className="text-lg font-bold text-[#2E86AB] mt-1">{completionRate}%</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-[#1A1D2B] mb-3">Current Active Lab Modules</h4>
                  <p className="text-sm text-[#5A6078]">Practicals aligned dynamically with <strong>{selectedCourse}</strong> workbook syllabus.</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-[#5A6078] font-medium">Status:</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200 font-bold">Active in Workspace</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'students' && (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {courseData.students.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white rounded-lg p-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2E86AB]/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-[#2E86AB]">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-sm text-[#1A1D2B]">{student.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {student.completed ? (
                        <>
                          <span className="text-sm font-bold text-[#2E86AB]">{student.score}%</span>
                          <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center border border-green-200">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </div>
                        </>
                      ) : (
                        <span className="text-xs font-semibold px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full">Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-[#5A6078] font-medium">Average Score</p>
                    <p className="text-2xl font-bold text-[#2E86AB] mt-1">{courseData.average}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs text-[#5A6078] font-medium">Struggling Concept</p>
                    <p className="text-lg font-bold text-[#FF6B35] mt-1 capitalize">{courseData.helpTopic}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-sm text-[#1A1D2B] mb-4">Class-Wide Syllabus Mastery</h4>
                  {courseData.conceptMastery?.map((item) => (
                    <div key={item.concept} className="mb-4 last:mb-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#5A6078] font-medium">{item.concept}</span>
                        <span className="font-bold text-[#1A1D2B]">{item.mastery}%</span>
                      </div>
                      <div className="h-2 bg-[#F0F4FA] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.mastery}%`,
                            backgroundColor: item.mastery > 70 ? '#2E86AB' : '#FF6B35',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleGenerateReport}
              className="flex-1 btn-primary"
            >
              Generate Report
            </button>
            <button
              onClick={closeTeacherModal}
              className="btn-secondary"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

