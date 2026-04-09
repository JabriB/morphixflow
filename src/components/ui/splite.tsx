'use client';

import { Suspense, lazy } from 'react';
import { cn } from '@/lib/utils';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid var(--color-primary-dim)',
              borderTopColor: 'var(--color-primary)',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      }
    >
      <Spline scene={scene} className={cn('w-full h-full', className)} />
    </Suspense>
  );
}
