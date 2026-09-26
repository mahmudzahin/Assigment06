"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/data/workouts";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-lime-400/50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Difficulty */}
        <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-lime-400 backdrop-blur">
          {workout.difficulty}
        </span>

        {/* Rating */}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {workout.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Muscle Groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-zinc-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white transition group-hover:text-lime-400">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-500">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-400">

          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-lime-400" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-400" />
            {workout.caloriesBurned} kcal
          </span>

        </div>
      </div>
    </Link>
  );
}