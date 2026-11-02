const arrowPaths = {
  right: ["M5 12h14", "m13 6 6 6-6 6"],
  left: ["M19 12H5", "m11 6-6 6 6 6"],
  up: ["M12 19V5", "m6 11 6-6 6 6"],
  down: ["M12 5v14", "m6 13 6 6 6-6"],
  "up-right": ["M7 17 17 7", "M8 7h9v9"],
  "down-right": ["M7 7l10 10", "M17 8v9H8"],
}

function ArrowIcon({ direction = "right", className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow-icon ${className}`.trim()}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      {(arrowPaths[direction] ?? arrowPaths.right).map((path) => (
        <path
          d={path}
          key={path}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      ))}
    </svg>
  )
}

export default ArrowIcon
