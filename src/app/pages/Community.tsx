import { useEffect } from "react";

export function Community() {
  useEffect(() => {
    window.location.href = "https://t.me/officialCTCclub";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Redirecting to Community...</h2>
      <p className="text-slate-500 dark:text-slate-400">
        If you are not redirected automatically,{" "}
        <a 
          href="https://t.me/officialCTCclub" 
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          click here to join our Telegram Channel
        </a>.
      </p>
    </div>
  );
}
