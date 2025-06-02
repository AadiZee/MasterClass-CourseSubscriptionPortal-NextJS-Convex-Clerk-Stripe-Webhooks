import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "@/components/CourseCard";

export default async function Home() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const courses = await convex.query(api.courses.getCourses);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Forge Your Path in Development
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master development skills through engaging, project-based learning.
            Unlock your potential with MasterClass.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
        <div className="text-center">
          <Link href={"/pro"}>
            <Button
              className="group hover:bg-purple-600 transition-colors duration-300"
              size="lg"
            >
              Explore Pro Plans
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
