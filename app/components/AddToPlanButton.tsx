
'use client';

import { useEffect, useState } from 'react';

interface AddToPlanButtonProps {
  exerciseId: number;
}

export default function AddToPlanButton({
  exerciseId,
}: AddToPlanButtonProps) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('fitlog-plan');

    const existingIds: number[] = stored
      ? JSON.parse(stored)
      : [];

    setAdded(existingIds.includes(exerciseId));
  }, [exerciseId]);

  const handleAddToPlan = () => {
    const stored = localStorage.getItem('fitlog-plan');

    const existingIds: number[] = stored
      ? JSON.parse(stored)
      : [];

    if (existingIds.includes(exerciseId)) {
      const updatedIds = existingIds.filter(
        (id) => id !== exerciseId
      );

      localStorage.setItem(
        'fitlog-plan',
        JSON.stringify(updatedIds)
      );

      setAdded(false);
      return;
    }

    const updatedIds = [
      ...existingIds,
      exerciseId,
    ];

    localStorage.setItem(
      'fitlog-plan',
      JSON.stringify(updatedIds)
    );

    setAdded(true);
  };

  return (
    <button
      type="button"
      onClick={handleAddToPlan}
      className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
    >
      {added ? 'Remove from Plan' : 'Add to Plan'}
    </button>
  );
}

