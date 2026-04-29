// export function calculateCurrentStreak(
//   completions: string[],
//   today?: string,
// ): number {
//   const todayStr = today ?? new Date().toISOString().split("T")[0];
//   const unique = [...new Set(completions)].sort();

//   if (!unique.includes(todayStr)) return 0;

//   let streak = 0;
//   const current = new Date(todayStr + "T00:00:00");

//   while (true) {
//     const dateStr = current.toISOString().split("T")[0];
//     if (!unique.includes(dateStr)) break;
//     streak++;
//     current.setDate(current.getDate() - 1);
//   }

//   return streak;
// }
export function calculateCurrentStreak(
  completions: string[],
  today?: string,
): number {
  const todayStr = today ?? new Date().toISOString().split("T")[0];
  const uniqueCompletions = [...new Set(completions)].sort();

  if (!uniqueCompletions.includes(todayStr)) return 0;

  let streak = 1;
  const prevDay = new Date(todayStr + "T00:00:00Z");
  prevDay.setUTCDate(prevDay.getUTCDate() - 1);

  while (true) {
    const prevStr = prevDay.toISOString().split("T")[0];
    if (!uniqueCompletions.includes(prevStr)) break;
    streak++;
    prevDay.setUTCDate(prevDay.getUTCDate() - 1);
  }

  return streak;
}
