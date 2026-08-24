export default function Loading() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-12 pt-32">
      <div className="animate-pulse">
        <div className="w-24 h-4 bg-slate-200 rounded mb-8"></div>
        <div className="w-2/3 h-10 bg-slate-200 rounded mb-4"></div>
        <div className="flex gap-3 mb-6">
          <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
          <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-64 bg-slate-200 rounded-2xl"></div>
      </div>
    </div>
  );
}
