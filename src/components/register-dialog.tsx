import { useState } from "react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

type RegisterDialogProps = {
  availableCourses: Course[];
  student: Student;
  onRegister: (courseId: string, time: string) => void;
};

export function RegisterDialog({
  availableCourses,
  student,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>("");

  // คำนวณเวลาปัจจุบันรูปแบบ HH:mm
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTime());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourseId) return;

    onRegister(selectedCourseId, selectedTime);
    setSelectedCourseId("");
    setSelectedTime(getCurrentTime());
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger>
        <Button className="gap-2" type="button">
          <UserPlus className="h-4 w-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label>วิชา</Label>
            <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    {course.courseId} - {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">ชื่อ นศ.</Label>
            <Input
              id="studentName"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" value={student.program} readOnly />
          </div>

          <DialogFooter>
            {/* ปุ่ม Disabled จนกว่าจะเลือกวิชา */}
            <Button type="submit" disabled={!selectedCourseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
