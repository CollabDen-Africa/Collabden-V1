export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-32 px-8 gap-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Welcome to <span className="text-primary-green">CollabDen</span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl">
          A collaborative platform designed to bring teams together.
          Experience seamless collaboration with our modern design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="btn-primary">
            Get Started
          </button>
          <button className="btn-secondary">
            Learn More
          </button>
        </div>

        {/* Demo of brand colors */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
          <div className="p-4 rounded-lg bg-primary-blue text-white text-sm">
            Primary Blue
          </div>
          <div className="p-4 rounded-lg text-white text-sm" style={{ background: 'var(--gradient-green)' }}>
            Gradient Green
          </div>
          <div className="p-4 rounded-lg bg-primary-green text-white text-sm">
            Primary Green
          </div>
          <div className="p-4 rounded-lg text-white text-sm" style={{ background: 'var(--gradient-blue-green)' }}>
            Blue-Green
          </div>
        </div>
      </main>
    </div>
  );
}

