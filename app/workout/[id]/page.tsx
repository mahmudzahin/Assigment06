
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Flame,
  Dumbbell,
  Star,
} from 'lucide-react';

import { WORKOUTS_DATA } from '@/data/workouts';
import AddToPlanButton from '@/app/components/AddToPlanButton';

interface WorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}


export function generateStaticParams() {
  return WORKOUTS_DATA.map((workout) => ({
    id: String(workout.id),
  }));
}

export default async function WorkoutPage({
  params,
}: WorkoutPageProps) {
  const { id } = await params;

  // URL id = string
  // Workout id = number
  const workout = WORKOUTS_DATA.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Workouts
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
            <Image
              src={workout.image}
              alt={workout.name}
              width={1000}
              height={700}
              className="h-[450px] w-full object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div>

            {/* Title */}
            <h1 className="text-4xl font-bold uppercase tracking-tight">
              {workout.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <Star
                size={20}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-semibold">
                {workout.rating}
              </span>

              <span className="text-gray-500">
                / 5
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-6 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-400"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">

              {/* Equipment */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
                <Dumbbell
                  size={20}
                  className="mb-2 text-red-500"
                />

                <p className="text-xs text-gray-500">
                  Equipment
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {workout.equipment}
                </p>
              </div>

              {/* Duration */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
                <Clock
                  size={20}
                  className="mb-2 text-red-500"
                />

                <p className="text-xs text-gray-500">
                  Duration
                </p>

                <p className="mt-1 font-semibold">
                  {workout.duration} min
                </p>
              </div>

              {/* Calories */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
                <Flame
                  size={20}
                  className="mb-2 text-red-500"
                />

                <p className="text-xs text-gray-500">
                  Calories
                </p>

                <p className="mt-1 font-semibold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              {/* Difficulty */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
                <p className="text-sm text-gray-500">
                  Difficulty
                </p>

                <p className="mt-1 font-semibold">
                  {workout.difficulty}
                </p>
              </div>

              {/* Sets */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
                <p className="text-sm text-gray-500">
                  Sets
                </p>

                <p className="mt-1 font-semibold">
                  {workout.sets}
                </p>
              </div>

              {/* Reps */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
                <p className="text-sm text-gray-500">
                  Reps
                </p>

                <p className="mt-1 font-semibold">
                  {workout.reps}
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              {/* Add / Remove Plan */}
              <AddToPlanButton
                exerciseId={workout.id}
              />

              {/* Save */}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-3 font-semibold transition hover:bg-gray-900"
              >
                <Bookmark size={18} />
                Save
              </button>

            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16">

          <h2 className="text-2xl font-bold">
            How to Perform
          </h2>

          <div className="mt-6 space-y-4">

            {workout.instructions.map(
              (instruction, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border border-gray-800 bg-gray-950 p-5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 font-bold">
                    {index + 1}
                  </div>

                  <p className="leading-7 text-gray-300">
                    {instruction}
                  </p>
                </div>
              )
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

