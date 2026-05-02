const fs = require('fs');
const file = 'C:/Users/SPARK COMPUTERS MART/Documents/CTC Club1/CTC-Club1/src/app/pages/CourseDetail.tsx';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(
  /\{isEnrolling\s*\?\s*"Enrolling..."\s*:\s*"Enroll Free"\}\s*<\/Button>\s*\)\s*:\s*null\}\s*\{role\s*===\s*"student"\s*\?\s*\(\s*<Button\s+variant="outline"\s+size="icon"\s+onClick=\{\(\)\s*=>\s*void\s+handleToggleFavorite\(\)\}\s+disabled=\{favoriteBusy\}>\s*<Heart\s+className=\{`h-5\s+w-5\s+\$\{isFavorite\s*\?\s*"text-red-500\s+fill-red-500"\s*:\s*""\}`\}\s*\/>\s*<\/Button>\s*\)\s*:\s*\(\s*<Button\s+variant="outline"\s+size="icon">\s*<BookmarkPlus\s+className="h-5\s+w-5"\s*\/>\s*<\/Button>\s*\)\}\s*<Button\s+variant="outline"\s+size="icon">\s*<Share2\s+className="h-5\s+w-5"\s*\/>\s*<\/Button>\s*<\/>\s*\)\}\s*<\/div>\s*<\/div>/g,
  `            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 mr-1">
                      {course.ratings?.average ? course.ratings.average.toFixed(1) : "0.0"}
                    </span>
                    ({course.ratings?.count || 0} reviews)
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  {course.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-lg">
                  {course.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 min-w-[200px]">
                {canAccessLessons ? (
                  <>
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                      size="lg"
                      onClick={() => setActiveTab("lessons")}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Continue Learning
                    </Button>
                  </>
                ) : (
                  <>
                    {(!course || ((course as any).accessMode !== 'locked' && (course as any).accessMode !== 'coming_soon')) && (
                      <Button 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                        onClick={() => void handleEnroll()}
                        disabled={isEnrolling}
                      >
                        {isEnrolling ? "Enrolling..." : "Enroll Free"}
                      </Button>
                    )}
                    <div className="flex gap-2 mt-2 w-full justify-end">
                      {role === "student" ? (
                        <Button variant="outline" size="icon" onClick={() => void handleToggleFavorite()} disabled={favoriteBusy}>
                          <Heart className={\`h-5 w-5 \${isFavorite ? "text-red-500 fill-red-500" : ""}\`} />
                        </Button>
                      ) : (
                        <Button variant="outline" size="icon" onClick={() => void handleToggleFavorite()} disabled={favoriteBusy}>
                          <BookmarkPlus className="h-5 w-5" />
                        </Button>
                      )}
                      <Button variant="outline" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>`
);

fs.writeFileSync(file, data, 'utf8');
console.log("Fixed JSX error");
