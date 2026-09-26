
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  ChevronDown,
  Clock,
  Flame,
  Play,
  Trash2,
} from 'lucide-react';
import { INITIAL_EXERCISES } from '@/data/exercises';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('saved');
  const [sortBy, setSortBy] = useState('duration');

  const [planIds, setPlanIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem('fitlog-plan');
    const storedSaved = localStorage.getItem('fitlog-saved');

    if (storedPlan) {
      setPlanIds(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSavedIds(JSON.parse(storedSaved));
    }
  }, []);

  // Get exercises from IDs
  const planExercises = INITIAL_EXERCISES.filter((exercise) =>
    planIds.includes(String(exercise.id))
  );

  const savedExercises = INITIAL_EXERCISES.filter((exercise) =>
    savedIds.includes(String(exercise.id))
  );

  const activeList =
    activeTab === 'today' ? planExercises : savedExercises;

  // Statistics
  const totalExercises = planExercises.length;

  const totalMinutes = planExercises.reduce(
    (total, exercise) =>
      total + (parseInt(exercise.stats?.duration || '0') || 0),
    0
  );

  const totalCalories = planExercises.reduce(
    (total, exercise) =>
      total + (parseInt(exercise.stats?.calories || '0') || 0),
    0
  );

  // Sorting
  const sortedExercises = useMemo(() => {
    return [...activeList].sort((a, b) => {
      if (sortBy === 'duration') {
        return (
          (parseInt(b.stats?.duration || '0') || 0) -
          (parseInt(a.stats?.duration || '0') || 0)
        );
      }

      if (sortBy === 'calories') {
        return (
          (parseInt(b.stats?.calories || '0') || 0) -
          (parseInt(a.stats?.calories || '0') || 0)
        );
      }

      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });
  }, [activeList, sortBy]);

  // Remove exercise
  const removeExercise = (id: string | number) => {
    const exerciseId = String(id);

    if (activeTab === 'today') {
      const updated = planIds.filter((item) => item !== exerciseId);

      setPlanIds(updated);
      localStorage.setItem('fitlog-plan', JSON.stringify(updated));
    } else {
      const updated = savedIds.filter((item) => item !== exerciseId);

      setSavedIds(updated);
      localStorage.setItem('fitlog-saved', JSON.stringify(updated));
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
              <Dumbbell className="h-7 w-7 text-red-500" />
            </div>

            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">
                My Plan
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Manage your workouts and saved exercises
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">
              Exercises
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalExercises}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />

              <p className="text-sm text-gray-400">
                Duration
              </p>
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              {totalMinutes}
              <span className="ml-2 text-sm font-normal text-gray-400">
                min
              </span>
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />

              <p className="text-sm text-gray-400">
                Calories
              </p>
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              {totalCalories}
              <span className="ml-2 text-sm font-normal text-gray-400">
                kcal
              </span>
            </h2>
          </div>

        </div>

        {/* Tabs + Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex w-fit rounded-xl border border-gray-800 bg-gray-950 p-1">

            <button
              type="button"
              onClick={() => setActiveTab('today')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                activeTab === 'today'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Today's Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                activeTab === 'saved'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved
            </button>

          </div>

          <div className="relative w-full sm:w-auto">

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 pr-10 text-sm text-white outline-none focus:border-red-500 sm:w-52"
            >
              <option value="duration">
                Sort by Duration
              </option>

              <option value="calories">
                Sort by Calories
              </option>

              <option value="name">
                Sort by Name
              </option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          </div>
        </div>

        {/* Exercises */}
        {sortedExercises.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {sortedExercises.map((exercise) => (

              <div
                key={exercise.id}
                className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition hover:border-red-500/50"
              >

                {/* Image */}
                <Link href={`/workout/${exercise.id}`}>
                  <div className="relative aspect-video overflow-hidden bg-gray-900">

                    <img
                      src={exercise.image}
                      alt={exercise.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-full bg-black/70 px-3 py-1 text-xs">
                        {exercise.category}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 opacity-0 transition group-hover:opacity-100">
                      <Play className="h-4 w-4 fill-white text-white" />
                    </div>

                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">

                  <h2 className="text-lg font-semibold">
                    {exercise.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                    {exercise.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4 text-blue-400" />
                        {exercise.stats?.duration}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Flame className="h-4 w-4 text-orange-500" />
                        {exercise.stats?.calories}
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() => removeExercise(exercise.id)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-500"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                </div>
              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-950 px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
              <Dumbbell className="h-7 w-7 text-gray-500" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {activeTab === 'today'
                ? "Today's plan is empty"
                : 'No saved exercises'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
              {activeTab === 'today'
                ? 'Go to the workout library and add exercises to your plan.'
                : 'Save exercises from the workout library to see them here.'}
            </p>

            <Link
              href="/workout"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <Dumbbell className="h-4 w-4" />
              Browse Workouts
            </Link>

          </div>

        )}

      </div>
    </main>
  );
}

