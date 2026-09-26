"use client";

import { WORKOUTS_DATA } from "@/data/workouts";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutLibrary() {
  return (
    <section
      id="library"
      className="bg-black px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
            THE LIBRARY
          </p>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Twelve lifts covering every major muscle group.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WORKOUTS_DATA.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>

      </div>
    </section>
  );
}