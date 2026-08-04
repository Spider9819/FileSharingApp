function StatsCard({ title, value }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">

      <h3 className="text-slate-400 text-lg">
        {title}
      </h3>

      <h1 className="text-white text-4xl font-bold mt-3">
        {value}
      </h1>

    </div>
  );
}

export default StatsCard;