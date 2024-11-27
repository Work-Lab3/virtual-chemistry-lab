import ChemistryLab from "./components/ChemistryLab";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-[#020617] text-white"
    style={{
      // backgroundImage:`url("https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i55aetWklPc8/v1/-1x-1.jpg")`
      // backgroundImage:`url("https://img.freepik.com/premium-photo/creative-abstract-3d-background-wallpaper-texture-abstract-3d-watercolor-background_372999-8823.jpg")`
    }}
    >
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Virtual Chemistry Lab</h1>
      <ChemistryLab />
    </main>
  )
}

