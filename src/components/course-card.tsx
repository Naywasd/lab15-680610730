import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onUnenroll: (courseId: string) => void;
};

export function CourseCard({ course, student, enrolledAt, isEnrolled, onUnenroll }: CourseCardProps) {
  const formatEnrolledTime = (timeStr?: string) => {
    if (!timeStr) return "";
    const date = new Date(timeStr);
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <Badge
            className={
              isEnrolled
                ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-purple-950 dark:text-purple-300 dark:hover:bg-purple-950"
                : "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-950"
            }
          >
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </div>
        
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatEnrolledTime(enrolledAt)}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onUnenroll(course.courseId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
