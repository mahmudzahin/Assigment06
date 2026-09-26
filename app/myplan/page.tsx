
'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Flame,
  Trash2,
  Check,
  ArrowRight,
} from 'lucide-react';

import { WORKOUTS_DATA } from '@/data/workouts';

type SortOption = 'duration' | 'calories' | 'name';

export default function MyPlanPage() {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [sortBy, setSortBy] =
    useState<SortOption>('duration');

  // Load plan + completed workouts
  useEffect(() => {
    const storedPlan = localStorage.getItem('fitlog-plan');
    const storedCompleted =
      localStorage.getItem('fitlog-completed');

    if (storedPlan) {
      try {
        const ids = JSON.parse(storedPlan);

        if (Array.isArray(ids)) {
          setPlanIds(
            ids.map(Number).filter((id) => !isNaN(id))
          );
        }
      } catch (error) {
        console.error(
          'Failed to load workout plan:',
          error
        );
      }
    }

    if (storedCompleted) {
      try {
        const ids = JSON.parse(storedCompleted);

        if (Array.isArray(ids)) {
          setCompletedIds(
            ids.map(Number).filter((id) => !isNaN(id))
          );
        }
      } catch (error) {
        console.error(
          'Failed to load completed workouts:',
          error
        );
      }
    }
  }, []);

  // Get workouts from selected IDs
  const planWorkouts = useMemo(() => {
    const workouts = WORKOUTS_DATA.filter((workout) =>
      planIds.includes(workout.id)
    );

    return [...workouts].sort((a, b) => {
      if (sortBy === 'duration') {
        return b.duration - a.duration;
      }

      if (sortBy === 'calories') {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [planIds, sortBy]);

  // Remove workout
  const removeFromPlan = (id: number) => {
    const updatedPlanIds = planIds.filter(
      (workoutId) => workoutId !== id
    );

    const updatedCompletedIds = completedIds.filter(
      (workoutId) => workoutId !== id
    );

    setPlanIds(updatedPlanIds);
    setCompletedIds(updatedCompletedIds);

    localStorage.setItem(
      'fitlog-plan',
      JSON.stringify(updatedPlanIds)
    );

    localStorage.setItem(
      'fitlog-completed',
      JSON.stringify(updatedCompletedIds)
    );
  };

  // Mark workout as done
  const markAsDone = (id: number) => {
    if (completedIds.includes(id)) {
      return;
    }

    const updatedCompletedIds = [
      ...completedIds,
      id,
    ];

    setCompletedIds(updatedCompletedIds);

    localStorage.setItem(
      'fitlog-completed',
      JSON.stringify(updatedCompletedIds)
    );
  };

  // Statistics
  const totalDuration = planWorkouts.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = planWorkouts.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  const completedCount = planWorkouts.filter(
    (workout) =>
      completedIds.includes(workout.id)
  ).length;

  return (
    <section className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              FitLog
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              My Plan
            </h1>

            <p className="mt-2 text-gray-400">
              Your selected workouts
            </p>
          </div>

          {/* Sort */}
          {planWorkouts.length > 0 && (
            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="text-sm text-gray-400"
              >
                Sort by
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as SortOption
                  )
                }
                className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm outline-none"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="name">
                  Name
                </option>
              </select>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">

          {/* Exercises */}
          <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-bold">
              {planWorkouts.length}
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold">
              {completedCount}
            </p>
          </div>

          {/* Duration */}
          <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Duration
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalDuration}
              <span className="ml-1 text-sm font-normal text-gray-500">
                min
              </span>
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Calories
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalCalories}
              <span className="ml-1 text-sm font-normal text-gray-500">
                kcal
              </span>
            </p>
          </div>

        </div>

        {/* Empty State */}
        {planWorkouts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-800 bg-gray-950 px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
              <Clock
                size={28}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Your plan is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Add workouts from the workout library
              and they will appear here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-3 font-semibold transition hover:bg-red-600"
            >
              Browse Workouts
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* Workout Cards */}
        {planWorkouts.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {planWorkouts.map((workout) => {
              const isCompleted =
                completedIds.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`overflow-hidden rounded-2xl border bg-gray-950 transition ${
                    isCompleted
                      ? 'border-green-500/40'
                      : 'border-gray-800'
                  }`}
                >

                  {/* Image */}
                  <Link
                    href={`/workout/${workout.id}`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className={`object-cover transition duration-300 hover:scale-105 ${
                          isCompleted
                            ? 'opacity-60'
                            : ''
                        }`}
                      />

                      {/* Done Badge */}
                      {isCompleted && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-black">
                          <Check size={14} />
                          Done
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <Link
                        href={`/workout/${workout.id}`}
                      >
                        <h2
                          className={`text-xl font-bold ${
                            isCompleted
                              ? 'text-gray-400'
                              : 'hover:text-red-500'
                          }`}
                        >
                          {workout.name}
                        </h2>
                      </Link>

                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                        {workout.difficulty}
                      </span>

                    </div>

                    {/* Muscle groups */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {workout.muscleGroups.map(
                        (muscle) => (
                          <span
                            key={muscle}
                            className="rounded-full bg-gray-900 px-3 py-1 text-xs text-gray-400"
                          >
                            {muscle}
                          </span>
                        )
                      )}
                    </div>

                    {/* Stats */}
                    <div className="mt-5 flex items-center gap-5 text-sm text-gray-400">

                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {workout.duration} min
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Flame size={16} />
                        {workout.caloriesBurned} kcal
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-2 gap-3">

                      {/* View */}
                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-900"
                      >
                        View
                        <ArrowRight size={16} />
                      </Link>

                      {/* Mark as Done */}
                      <button
                        type="button"
                        onClick={() =>
                          markAsDone(workout.id)
                        }
                        disabled={isCompleted}
                        className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                          isCompleted
                            ? 'cursor-default bg-green-500/10 text-green-400'
                            : 'bg-green-500 text-black hover:bg-green-400'
                        }`}
                      >
                        <Check size={16} />

                        {isCompleted
                          ? 'Completed'
                          : 'Mark as Done'}
                      </button>

                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        removeFromPlan(workout.id)
                      }
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-800 px-4 py-2 text-sm text-gray-500 transition hover:border-red-500 hover:text-red-500"
                    >
                      <Trash2 size={15} />
                      Remove from Plan
                    </button>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}

