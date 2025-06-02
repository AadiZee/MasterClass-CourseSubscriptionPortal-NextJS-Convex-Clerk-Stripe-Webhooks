import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import PurchaseButton from "./PurchaseButton";
import { Id } from "../../convex/_generated/dataModel";

interface CourseInterface {
  _id: Id<"courses">;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface CourseCardProps {
  course: CourseInterface;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="flex flex-col">
      <Link href={`/courses/${course._id}`} className="cursor-pointer">
        <CardHeader>
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={640}
            height={360}
            className="rounded-md object-cover"
          />
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="text-xl mb-2 hover:underline">
            {course.title}
          </CardTitle>
        </CardContent>
      </Link>

      <CardFooter className="flex justify-between items-center">
        <Badge variant="default" className="text-lg px-3 py-1">
          ${course.price.toFixed(2)}
        </Badge>

        <SignedIn>
          <PurchaseButton courseId={course._id} />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline">Enroll Now</Button>
          </SignInButton>
        </SignedOut>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
