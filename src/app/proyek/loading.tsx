export default function Loading() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-12 pt-32">
      <div className="animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-64 mb-8"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
