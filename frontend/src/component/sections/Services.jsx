export default function Services() {
  const services = [
    {
      id: 1,
      title: 'FREE AND FAST DELIVERY',
      // img: 'https://img.freepik.com/free-vector/delivery-white_24877-49438.jpg?t=st=1740216914~exp=1740220514~hmac=d75ba11aa538d1a90e78a927e744b493b84e9d53b722e23e841978f5e8331876&w=996',
      description: 'Free delivery for all orders over $140'
    },
    {
      id: 2,
      title: '24/7 CUSTOMER SERVICE',
      // img: 'https://img.freepik.com/free-vector/service-24-7-concept-illustration_114360-7720.jpg?t=st=1740217213~exp=1740220813~hmac=e08cd2ded2d079a23bc1b0b7f8ac361f9f9b71edb39f10e7778cdd4ee3182d3f&w=996',
      description: 'Friendly 24/7 customer support'
    },
    {
      id: 3,
      title: 'MONEY BACK GUARANTEE',
      // img: 'https://img.freepik.com/premium-vector/24-hour-service-iconheadphone-talk-support-phone-consult-customer-problems_68708-3348.jpg?w=996',
      description: 'We return money within 30 days'
    }
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
      {services.map(service => (
        <div key={service.id} className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            {service.img}
          </div>
          <h3 className="font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </section>
  )
}