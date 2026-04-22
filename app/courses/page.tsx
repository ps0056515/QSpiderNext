import { getAllCoursesFromDb } from '@/lib/catalog';
import { CoursesClient } from './CoursesClient';

export default async function CoursesPage() {
  const courses = await getAllCoursesFromDb();
  return <CoursesClient initialCourses={courses} />;
}
