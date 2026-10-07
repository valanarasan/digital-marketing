import type { ReactNode, SVGProps } from 'react';
import type { StepIconName } from '@/types/content';

/** One line drawing per process step, all on the same 200×125 canvas. */
const DRAWINGS: Record<StepIconName, ReactNode> = {
  diagnose: (
    <>
      <circle cx="88" cy="56" r="32" />
      <path d="M111 79l29 29" />
      <path d="M74 70V60M86 70V46M98 70V54" />
      <path d="M30 112h140" />
    </>
  ),
  architect: (
    <>
      <path d="M100 14l42 24v48l-42 24-42-24V38z" />
      <path d="M58 38l42 24 42-24M100 62v48" />
      <path d="M79 26l42 24v24M121 26L79 50v24" />
    </>
  ),
  activate: (
    <>
      <path d="M60 50v58h58" />
      <path d="M78 90l64-64" />
      <path d="M106 26h36v36" />
      <path d="M40 34h18M150 88h18M40 70h10" />
    </>
  ),
  optimise: (
    <>
      <path d="M40 108h124M40 108V20" />
      <path d="M50 94l30-24 26 12 44-46" />
      <circle cx="80" cy="70" r="4" />
      <circle cx="106" cy="82" r="4" />
      <circle cx="150" cy="36" r="4" />
      <path d="M128 36h22v22" />
    </>
  ),
  compound: (
    <>
      <circle cx="56" cy="98" r="10" />
      <circle cx="88" cy="90" r="18" />
      <circle cx="134" cy="78" r="30" />
      <path d="M30 108h140" />
    </>
  ),
};

export interface StepIconProps extends SVGProps<SVGSVGElement> {
  name: StepIconName;
}

export function StepIcon({ name, ...rest }: StepIconProps) {
  return (
    <svg
      viewBox="0 0 200 125"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {DRAWINGS[name]}
    </svg>
  );
}
