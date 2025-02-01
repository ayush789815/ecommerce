export default function MusicBanner() {
  return (
    <section className="bg-black text-white py-16 px-8 text-center mb-16 rounded-lg">
      <h2 className="text-3xl font-bold mb-8">Enhance Your Music Experience</h2>
      <div className="flex justify-center gap-2 mb-8">
        <span className="w-3 h-3 bg-white rounded-full"></span>
        <span className="w-3 h-3 bg-white rounded-full"></span>
        <span className="w-3 h-3 bg-white rounded-full"></span>
        <span className="w-3 h-3 bg-white rounded-full"></span>
      </div>
      <button className="bg-green-500 text-white px-8 py-3 rounded hover:bg-green-600 transition-colors">
        Shop Now
      </button>
    </section>
  )
}