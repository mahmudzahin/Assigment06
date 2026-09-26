import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Flame, Star, ArrowLeft } from "lucide-react";

import { WORKOUTS_DATA } from "@/data/workouts";

interface WorkoutDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailPageProps) {
  const { id } = await params;

  const workout = WORKOUTS_DATA.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-lime-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to workouts
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 lg:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-[350px] lg:min-h-[600px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 lg:p-12">

            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-black uppercase sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-zinc-400">
              {workout.description}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-xs text-zinc-500">Equipment</p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.equipment}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-xs text-zinc-500">Difficulty</p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.difficulty}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-xs text-zinc-500">Sets</p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-xs text-zinc-500">Reps</p>
                <p className="mt-1 text-sm font-semibold">
                  {workout.reps}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-lime-400" />
                  <p className="text-xs text-zinc-500">Duration</p>
                </div>
                <p className="mt-1 text-sm font-semibold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 p-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <p className="text-xs text-zinc-500">Calories</p>
                </div>
                <p className="mt-1 text-sm font-semibold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

            </div>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{workout.rating}</span>
              <span className="text-zinc-500">rating</span>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-xl font-bold">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-zinc-400"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                      {index + 1}
                    </span>

                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}