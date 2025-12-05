export function formatDateTimeUS(
  value?: string | number | Date | null,
): string {
  if (value === undefined || value === null) return "";

  const date =
    typeof value === "string" || typeof value === "number"
      ? new Date(value)
      : value;

  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
