// // src/components/shared/SplashScreen.tsx
// export default function SplashScreen() {
//   return (
//     <div
//       data-testid="splash-screen"
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"
//     >
//       <div className="text-center text-white">
//         <h1 className="text-4xl font-bold mb-4">Habit Tracker</h1>
//         <div className="animate-pulse">Loading...</div>
//       </div>
//     </div>
//   );
// }

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="fixed inset-0 flex flex-col items-center justify-center bg-white"
    >
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Habit Tracker
      </h1>
      <p className="mt-2 text-gray-500">Building better days</p>
    </div>
  );
}
