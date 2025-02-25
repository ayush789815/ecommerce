export default function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-5 h-10 bg-primary"></div>
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
    </div>
  )
}