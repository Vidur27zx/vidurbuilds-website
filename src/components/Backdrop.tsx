export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bd-top" x1="1" y1="0" x2="0.2" y2="1">
            <stop offset="0" stopColor="#f4dccb" />
            <stop offset="1" stopColor="#f7e6da" />
          </linearGradient>
          <linearGradient id="bd-top-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2d6c3" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f6e2d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bd-bottom" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#f3dccc" />
            <stop offset="1" stopColor="#f8eadf" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g>
          <g>
            <path
              d="M1500 -40 L1500 700 C1380 640 1300 540 1220 420 C1140 300 1060 160 900 90 C820 55 760 10 740 -40 Z"
              fill="url(#bd-top)"
            />
            <path
              d="M1500 -40 L1500 420 C1420 380 1360 300 1300 210 C1240 120 1170 40 1080 -40 Z"
              fill="url(#bd-top-2)"
            />
          </g>
        </g>
        <g>
          <g>
            <path d="M-60 940 L-60 610 C80 580 220 620 330 700 C420 765 470 850 500 940 Z" fill="url(#bd-bottom)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
