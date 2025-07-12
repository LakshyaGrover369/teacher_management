import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const particles = [
    { top: "20%", left: "15%", color: "bg-purple-400" },
    { top: "70%", left: "20%", color: "bg-blue-400" },
    { top: "40%", left: "80%", color: "bg-green-400" },
    { top: "80%", left: "70%", color: "bg-yellow-400" },
    { top: "50%", left: "50%", color: "bg-pink-400" },
  ];

  return (
    <>
      <Head>
        <title>EduConnect - Teacher Management</title>
        <meta
          name="description"
          content="Simple and attractive teacher management platform"
        />
      </Head>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        {/* Simple floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 rounded-full ${p.color} opacity-60 blur-md`}
            style={{ top: p.top, left: p.left }}
          />
        ))}

        <div className="z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            EduConnect
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Manage teachers easily with{" "}
            <span className="font-semibold text-purple-300">Tech Driven</span>{" "}
            tools.
          </p>
          <button
            className="px-6 py-3 bg-purple-600 hover:bg-blue-600 rounded-lg text-white font-semibold shadow-lg transition"
            onClick={() => router.push("/teachers")}
          >
            Go to Dashboard →
          </button>
          <div className="mt-10 flex justify-center space-x-4">
            {["Next.js", "Tailwind CSS", "TypeScript"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 bg-opacity-60 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
