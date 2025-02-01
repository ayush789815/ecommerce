export default function NewArrivals() {
  const arrivals = [
    {
      id: 1,
      title: 'PlayStation 5',
      image: 'https://via.placeholder.com/400x400',
      size: 'large'
    },
    {
      id: 2,
      title: "Women's Collections",
      image: 'https://via.placeholder.com/200x200',
      size: 'small'
    },
    {
      id: 3,
      title: 'Speakers',
      image: 'https://via.placeholder.com/200x200',
      size: 'small'
    },
    {
      id: 4,
      title: 'Perfume',
      image: 'https://via.placeholder.com/200x200',
      size: 'small'
    }
  ]

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-5 h-10 bg-primary"></div>
        <h2 className="text-2xl font-bold">New Arrival</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {arrivals.map(item => (
          <div
            key={item.id}
            className={`relative rounded-lg overflow-hidden ${
              item.size === 'large' ? 'md:row-span-2' : ''
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}