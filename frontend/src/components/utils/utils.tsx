export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const formatSmartDate = (date: Date | string | number, startWeekOnMonday = false): string => {
  const targetDate = date instanceof Date ? date : new Date(date);
  if (isNaN(targetDate.getTime())) return "Invalid date";

  const now = new Date();

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const getDateOnly = (d: Date): Date =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const getWeekStart = (d: Date): Date => {
    const start = new Date(d);
    let day = start.getDay();
    if (startWeekOnMonday) {
      day = day === 0 ? 6 : day - 1;
    }
    start.setDate(start.getDate() - day);
    return getDateOnly(start);
  };

  const getWeekEnd = (d: Date): Date => {
    const end = getWeekStart(d);
    end.setDate(end.getDate() + 6);
    return end;
  };

  const today = getDateOnly(now);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const targetDateOnly = getDateOnly(targetDate);
  const weekStart = getWeekStart(now);
  const weekEnd = getWeekEnd(now);

  if (targetDateOnly.getTime() === today.getTime()) {
    return formatTime(targetDate);
  }

  if (targetDateOnly.getTime() === tomorrow.getTime()) {
    return `Tomorrow ${formatTime(targetDate)}`;
  }

  if (targetDateOnly >= weekStart && targetDateOnly <= weekEnd) {
    const dayName = targetDate.toLocaleDateString("en-US", { weekday: "long" });
    return `${dayName} ${formatTime(targetDate)}`;
  }

  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(targetDate.getFullYear() !== now.getFullYear() && { year: "numeric" }),
  });
};
