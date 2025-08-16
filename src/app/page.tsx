import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import resumeLogo from "@/assets/resume-preview.jpg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
      <div className="spce-y-3 max-w-prose">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create the{" "}
          <span className="inline-block bg-gradient-to-r from-green-600 to-gray-400 bg-clip-text text-transparent">
            Perfect Resume
          </span>{" "}
          in Minutes
          <p className="text-lg text-gray-500">
            Our{" "}
            <span className="inline-block bg-gradient-to-r from-green-600 to-gray-400 bg-clip-text font-bold text-transparent">
              AI resume builder{" "}
            </span>{" "}
            helps you design a professional resume effortlessly.
          </p>
          <Button asChild size="lg" variant="premium">
            <Link href="/resumes">Get started</Link>
          </Button>
        </h1>
      </div>
      <div>
        <Image
          src={resumeLogo}
          alt="Logo"
          width={600}
          className="shadow-md lg:rotate-[1.5deg]"
        />
      </div>
    </main>
  );
}
