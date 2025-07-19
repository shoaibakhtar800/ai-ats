import { resumes } from "constants/index";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import ResumeCard from "~/components/resume-card";
import { usePuterStore } from "~/libs/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumhance" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered resume ratings</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
              <ResumeCard resume={resume} key={resume.id} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
