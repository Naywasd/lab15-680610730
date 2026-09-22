import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

export default function EnrollmentPage() {
  const [userEnrollments, setUserEnrollments] = useState(
    enrollments.filter((e) => e.studentId === currentStudent.studentId)
  );

  const enrolledCourseIds = userEnrollments.map((e) => e.courseId);

  const availableCourses = courses.filter(
    (c) => !enrolledCourseIds.includes(c.courseId)
  );

  const handleRegister = (courseId: string, time: string) => {
    const today = new Date().toISOString().split("T")[0];
    const newEnrollment = {
      studentId: currentStudent.studentId,
      courseId,
      enrolledAt: `${today}T${time}:00`,
    };
    setUserEnrollments((prev) => [...prev, newEnrollment]);
  };

  const handleUnenroll = (courseId: string) => {
    setUserEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            {currentStudent.firstName} {currentStudent.lastName} ({currentStudent.studentId})
          </p>
        </div>
        <RegisterDialog
          availableCourses={availableCourses}
          student={currentStudent}
          onRegister={handleRegister}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollmentInfo = userEnrollments.find(
            (e) => e.courseId === course.courseId
          );
          const isEnrolled = !!enrollmentInfo;

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={isEnrolled}
              enrolledAt={enrollmentInfo?.enrolledAt}
              onUnenroll={handleUnenroll}
            />
          );
        })}
      </div>
    </div>
  );
}
