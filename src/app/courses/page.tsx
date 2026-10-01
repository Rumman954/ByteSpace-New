import { Suspense } from "react";
import CoursesPage from "./CoursesClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-gray-400">Loading…</div>}>
      <CoursesPage />
    </Suspense>
  );
}
