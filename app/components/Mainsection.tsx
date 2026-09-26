"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-zinc-800 bg-black">
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">

        {/* Left Column */}
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT.
            <br />
            <span className="text-lime-400">LOG EVERY SET.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA */}
          <div className="mt-9">
            <a
              href="#library"
              className="inline-flex items-center rounded-full bg-lime-400 px-6 py-3 text-sm font-black tracking-wide text-black transition hover:bg-lime-300"
            >
              BROWSE WORKOUTS
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative flex items-center justify-center">

          {/* Background glow */}
          <div className="absolute h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />

          <div className="relative w-full max-w-xl">
            <Image
              src="/Assigment06/banner.png"
              alt="Workout illustration"
              width={700}
              height={700}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}