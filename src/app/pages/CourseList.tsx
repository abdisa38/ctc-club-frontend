import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Search, Filter, Star, Clock, Users, PlayCircle, PlusCircle, X, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import apiService, { Course as ApiCourse } from "../services/api";

type CourseType = ApiCourse;

const extractErrorMessage = (error: any, fallback: string) => {
  const candidate = error?.response?.data?.message ?? error?.message;
  if (typeof candidate === "string" && candidate.trim()) {
    return candidate;
  }

  if (candidate && typeof candidate === "object") {
    try {
      return JSON.stringify(candidate);
    } catch {
      return fallback;
    }
  }

  return fallback;
};

export function CourseList() {
  const { role, user } = useAuth();
  const isAdmin = role === 'admin';
  const isInstructor = role === 'instructor' || isAdmin;

  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoritingIds, setFavoritingIds] = useState<Set<string>>(new Set());
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const payload = await apiService.getCourses({ limit: 100 });
        setCourses(payload.items || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || role !== 'student') {
        setFavorites(new Set());
        return;
      }

      try {
        const favoriteCourses = await apiService.getFavoriteCourses();
        setFavorites(new Set(favoriteCourses.map((course) => course._id)));
      } catch (error) {
        console.error("Failed to fetch favorite courses:", error);
      }
    };

    void fetchFavorites();
  }, [role, user?._id]);

  const filteredCourses = courses.filter(c => {
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory && c.category !== selectedCategory) return false;
    return true;
  });

  const activeFilters = [selectedCategory, selectedLevel, selectedDuration].filter(Boolean).length;

  const toggleFavorite = async (id: string) => {
    if (!user || role !== 'student') {
      return;
    }

    if (favoritingIds.has(id)) {
      return;
    }

    const isFavorite = favorites.has(id);

    setFavoritingIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    try {
      if (isFavorite) {
        await apiService.removeFavoriteCourse(id);
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        await apiService.addFavoriteCourse(id);
        setFavorites((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
    } finally {
      setFavoritingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const isUserEnrolled = (course: CourseType) => {
    if (!user || !Array.isArray(course.students)) return false;

    return course.students.some((student: any) => {
      if (typeof student === "string") return student === user._id;
      if (student && typeof student === "object" && student._id) return student._id === user._id;
      return String(student) === user._id;
    });
  };

  const markCourseEnrolledLocally = (id: string) => {
    if (!user) return;

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course._id !== id) return course;

        const students = Array.isArray(course.students) ? course.students : [];
        const alreadyEnrolled = students.some((student: any) =>
          typeof student === "string" ? student === user._id : student?._id === user._id
        );

        if (alreadyEnrolled) return course;

        return {
          ...course,
          students: [...students, user._id],
        };
      })
    );
  };

  const handleEnroll = async (course: CourseType) => {
    if (!user) {
      window.location.href = "/login";
      return; 
    }
    setActionError("");

    const id = course._id;
    const isPaidCourse = Number(course.price || 0) > 0;

    setEnrollingId(id);
    try {
      if (isPaidCourse) {
        window.location.href = `/app/courses/${id}`;
        return;
      }

      await apiService.enrollCourse(id);
      markCourseEnrolledLocally(id);
    } catch (error) {
      setActionError(extractErrorMessage(error, "Failed to start enrollment/checkout."));
      console.error("Failed to enroll:", error);
    } finally {
      setEnrollingId(null);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-slate-500">Loading courses...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Course Catalog
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Discover hundreds of university-grade courses.</p>
        </div>
        {isInstructor && (
          <Button asChild className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link to="/app/instructor/courses/new"><PlusCircle className="h-4 w-4 mr-2" /> Add Course</Link>
          </Button>
        )}
      </div>

      <Card className="bg-white/50 dark:bg-slate-900/50">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search courses by title, instructor, or tags..."
                className="pl-10 h-12 bg-white dark:bg-slate-950"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              className="h-12 px-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" /> Filters
              {activeFilters > 0 && (
                <Badge className="ml-2 bg-white text-indigo-600 h-5 w-5 p-0 flex items-center justify-center">{activeFilters}</Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <select
                className="h-10 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Development">Web Development</option>
                <option value="Design">Design</option>
              </select>
              <select
                className="h-10 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                className="h-10 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                <option value="">Any Duration</option>
                <option value="short">Short (&lt; 10h)</option>
                <option value="medium">Medium (10-25h)</option>
                <option value="long">Long (25h+)</option>
              </select>
              {activeFilters > 0 && (
                <Button variant="ghost" size="sm" onClick={() => { setSelectedCategory(""); setSelectedLevel(""); setSelectedDuration(""); }}>
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {actionError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError}
        </div>
      ) : null}

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 px-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
          <Search className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">No courses found</h3>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setSelectedCategory(""); setSelectedLevel(""); setSelectedDuration(""); }}>Clear all filters</Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500">{filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found</p>
          <div className="space-y-4 max-w-6xl mx-auto">
            {filteredCourses.map((course, i) => {
              const hasRatings = Number(course.numReviews || 0) > 0;
              const ratingLabel = hasRatings ? Number(course.rating || 0).toFixed(1) : "N/A";
              const isPaidCourse = Number(course.price || 0) > 0;
              const isEnrolled = isUserEnrolled(course);

              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-white dark:bg-slate-900">
                    <div className="flex flex-col sm:flex-row">
                      {/* Course Image */}
                      <div className="relative w-full sm:w-64 aspect-video sm:aspect-auto sm:h-40 shrink-0">
                        <img
                          src={course.coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'}
                          alt={course.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button size="icon" className="rounded-full h-12 w-12 bg-white hover:bg-white shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300" asChild>
                            <Link to={`/app/courses/${course._id}`}><PlayCircle className="h-6 w-6 text-indigo-600" /></Link>
                          </Button>
                        </div>
                        <button
                          onClick={(e) => { e.preventDefault(); void toggleFavorite(course._id); }}
                          disabled={role !== 'student' || favoritingIds.has(course._id)}
                          className="absolute top-2 right-2 h-8 w-8 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:scale-110"
                          title={role === 'student' ? (favorites.has(course._id) ? 'Remove from favorites' : 'Add to favorites') : 'Favorites are available for students'}
                        >
                          <Heart className={`h-4 w-4 transition-all ${favorites.has(course._id) ? "text-red-500 fill-red-500 scale-110" : "text-slate-600"}`} />
                        </button>
                        {isEnrolled && (
                          <Badge className="absolute bottom-2 left-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md font-semibold text-[10px] py-0.5 px-2">Enrolled</Badge>
                        )}
                      </div>

                      {/* Course Info */}
                      <CardContent className="flex-1 p-4 flex flex-col">
                        <Link to={`/app/courses/${course._id}`} className="block mb-2 group/title">
                          <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-white group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-400 transition-colors">
                            {course.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-[10px]">
                            {(course.instructor?.name || 'U')[0].toUpperCase()}
                          </span>
                          {course.instructor?.name || 'Unknown Instructor'}
                        </p>

                        {course.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mt-auto">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{ratingLabel}</span>
                            {hasRatings && (
                              <span className="text-slate-400 text-xs">({course.numReviews})</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                            <Users className="h-4 w-4" />
                            <span>{Array.isArray(course.students) ? course.students.length : 0} students</span>
                          </div>
                          <Badge variant="secondary" className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            <Clock className="h-3 w-3 mr-1 inline" /> 10h
                          </Badge>
                          <Badge className={`text-xs px-2 py-1 font-bold shadow-sm ${isPaidCourse ? "bg-gradient-to-r from-rose-100 to-orange-100 text-rose-700" : "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700"}`}>
                            {isPaidCourse ? `${Number(course.price || 0).toFixed(2)} ETB` : "Free"}
                          </Badge>
                          
                          {!isEnrolled && (
                            <Button
                              size="sm"
                              className={`ml-auto h-9 px-6 text-xs font-extrabold rounded-lg border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${isPaidCourse
                                ? "bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white"
                                : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white"}`}
                              onClick={() => handleEnroll(course)}
                              disabled={enrollingId === course._id}
                            >
                              {enrollingId === course._id
                                ? (isPaidCourse ? "Opening..." : "Enrolling...")
                                : (isPaidCourse ? "Request Access" : "Enroll Free")}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}