export default function Timer({ time }) {
  return (
    <div className="flex gap-4">
      {Object.entries(time).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <span className="block text-2xl font-bold">{value}</span>
          <label className="text-sm capitalize">{unit}</label>
        </div>
      ))}
    </div>
  )
}