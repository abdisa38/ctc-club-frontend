import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Search, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import api from "../utils/api";

type FeaturedCourse = {
  id: string;
  title: string;
  instructor: string;
  students: number;
  category: string;
  price: number;
  currency: string;
  image: string;
  description?: string;
};

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`home-luxe-card rounded-2xl backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(2,132,199,0.45)] dark:hover:shadow-[0_24px_60px_-34px_rgba(0,0,0,0.85)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function PublicCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<FeaturedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toNumber = (value: unknown, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRes = await api.get('/courses?limit=100');
        const coursesPayload = coursesRes.data?.data ?? coursesRes.data;
        const rawCourses = Array.isArray(coursesPayload?.courses)
          ? coursesPayload.courses
          : Array.isArray(coursesPayload)
            ? coursesPayload
            : [];

        if (rawCourses.length > 0) {
          const mappedCourses = rawCourses.map((c: any) => ({
            id: String(c._id),
            title: c.title,
            instructor: c.instructor?.name || 'Instructor',
            students: Array.isArray(c.students) ? c.students.length : 0,
            category: c.category || 'Tech',
            price: toNumber(c.price, 0),
            currency: String(c.currency || 'ETB'),
            image: c.coverImage || 'https://images.unsplash.com/photo-1637937459053-c788742455be?w=600&h=340&fit=crop',
            description: c.shortDescription || c.description || ''
          }));
          setCourses(mappedCourses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    !searchQuery || 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050117] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050117] text-white pt-0 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <Badge className="mb-5 py-1 px-3.5 text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              Courses
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight mb-6">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">Courses</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Start learning with our curated courses designed for beginners.
            </p>
          </div>
        </AnimatedSection>

        {/* Search Filter */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search courses..."
                className="pl-10 h-10 rounded-lg border-slate-300/70 bg-white/85 backdrop-blur-sm shadow-sm dark:bg-slate-900/70 dark:border-white/10 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Course Cards - Single Column Layout */}
        <div className="max-w-5xl mx-auto space-y-4">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No courses found.</p>
            </div>
          ) : (
            filteredCourses.map((course, i) => {
              const isPaid = Number(course.price || 0) > 0;
              return (
                <AnimatedSection key={course.id} delay={i * 0.05}>
                  <PremiumCard className="group overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Course Image */}
                      <div className="relative w-full sm:w-64 aspect-video sm:aspect-auto sm:h-40 rounded-lg overflow-hidden shrink-0">
                        <ImageWithFallback 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-2">{course.instructor}</p>
                        
                        {course.description && (
                          <p className="text-sm text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 mt-auto">

                          <Button 
                            size="sm" 
                            className="ml-auto h-8 text-xs font-bold rounded-md shadow-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white" 
                            asChild
                          >
                            <Link to={`/app/courses/${course.id}`}>Open Course</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </AnimatedSection>
              );
            })
          )}
        </div>

        {/* View All Button */}
        {filteredCourses.length > 0 && (
          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl h-11 px-8 font-semibold shadow-lg shadow-purple-500/20" 
                asChild
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
