import Header from './components/Header'
import DifficultySelector from './components/DifficultySelector'
import AnimatedBackground from './components/AnimatedBackground'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center relative overflow-hidden">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow w-full px-4">
        <h1 className="text-6xl font-bold text-center mb-8 text-blue-800">
          Test Your Chemistry Knowledge
        </h1>

        <DifficultySelector />

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Why Play Our Chemistry Quiz?
          </h2>
          <ul className="text-lg text-gray-700">
            <li>🧪 Test your knowledge across various chemistry topics</li>
            <li>🏆 Challenge yourself with increasing difficulty levels</li>
            <li>🧠 Learn fascinating facts about the world of chemistry</li>
            <li>📊 Track your progress and compete on the leaderboard</li>
          </ul>
        </div>
      </main>

      <footer className="w-full text-center py-4 text-gray-600">
        © 2023 Chemistry Quiz. All rights reserved.
      </footer>

      <AnimatedBackground />
    </div>
  )
}
