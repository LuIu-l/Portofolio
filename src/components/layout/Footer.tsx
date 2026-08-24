export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-20">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Alif Ikhwan Aulad Alhafidz. All rights reserved.
        </p>
        <p className="text-slate-400 text-xs mt-2">
          Developer yang juga punya mata fotografer.
        </p>
      </div>
    </footer>
  );
}
