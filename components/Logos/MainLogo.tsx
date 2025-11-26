import { SVGProps } from "react";
const MainLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-label="Carflex logo" {...props}>
    <g
      fill="none"
      stroke="#1d2a51"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
    >
      <path d="M130 260c70-60 230-100 410-100 160 0 280 30 380 70 60 25 120 40 200 40" />
      <path
        strokeWidth={10}
        d="M140 300c120 20 280 30 420 20 160-10 300-20 460-20"
      />
    </g>
    <g fill="#1d2a51">
      <circle cx={330} cy={340} r={36} />
      <circle cx={900} cy={340} r={36} />
    </g>
    <text
      x="50%"
      y={420}
      fill="#1d2a51"
      fontFamily="Segoe UI, Roboto, Helvetica, Arial, sans-serif"
      fontSize={96}
      fontWeight={700}
      textAnchor="middle"
    >
      {"Carflex"}
    </text>
  </svg>
);
export default MainLogo;
