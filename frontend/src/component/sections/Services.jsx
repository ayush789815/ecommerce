export default function Services() {
  const services = [
    {
      id: 1,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140'
    },
    {
      id: 2,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support'
    },
    {
      id: 3,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days'
    }
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
      {services.map(service => (
        <div key={service.id} className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </section>
  )
}