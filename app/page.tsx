import MainSection from './components/Mainsection'
import WorkoutLibrary from './components/WorkoutLibraray';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <MainSection />

      {/* Workout Library */}
      <section
        id="library"
        className="bg-black px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
            THE LIBRARY
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Twelve lifts covering every major muscle group.
          </h2>

          {/* Workout cards will go here */}
          <WorkoutLibrary/>
        </div>
      </section>
    </>
  );
}