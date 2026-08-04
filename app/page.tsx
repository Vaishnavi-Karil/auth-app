import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to GrowthOS</h1>
        <p className="text-xl text-gray-300 mb-8">A modern authentication system with user profiles</p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Sign Up
          </Link>
          <Link
            href="/profile"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            View Profile
          </Link>
        </div>

        <div className="mt-12 bg-slate-700 rounded-lg p-6 inline-block">
          <p className="text-gray-300 text-sm">
            <span className="font-semibold text-white">Demo Credentials:</span>
            <br />
            Email: test@example.com
            <br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}
