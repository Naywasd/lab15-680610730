import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentStudent } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-lg">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button>
            <Link to="/enrollment">ไปหน้าลงทะเบียนเรียน</Link>
          </Button>
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
      </p>
    </div>
  );
}