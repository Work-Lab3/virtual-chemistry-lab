import ChemistryLab from "./(home)/components/ChemistryLab";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Virtual Chemistry Lab</h1>
      <ChemistryLab />
    </main>
  )
}

