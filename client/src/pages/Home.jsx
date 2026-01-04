import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const categories = [
  { id: 1, title: 'Men Clothing', desc: 'Shirts, trousers, and more' },
  { id: 2, title: 'Women Clothing', desc: 'Dresses, tops, and styles' },
  { id: 3, title: 'Electronics', desc: 'Phones, laptops, accessories' },
  { id: 4, title: 'Home & Kitchen', desc: 'Essentials for your home' },
  { id: 5, title: 'Sports', desc: 'Fitness and outdoor gear' },
  { id: 6, title: 'Beauty', desc: 'Skincare and cosmetics' },
  { id: 7, title: 'Kids', desc: 'Toys, clothes & more' },
  { id: 8, title: 'Accessories', desc: 'Bags, belts, jewelry' },
]

const Home = () => {
  const user = useSelector((state) => state?.user)
  const navigate = useNavigate()

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 min-h-[calc(100vh-6rem)] flex items-start justify-center py-8 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            {user?._id && (
              <div className="text-sm font-medium text-emerald-700 mb-1">Welcome back, {user.name || 'User'}!</div>
            )}
            <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-900 leading-tight">FastCart — Shop smart, get it faster</h1>
            <p className="mt-3 text-gray-700 max-w-xl">FastCart brings you a curated selection of products across categories — from fashion to electronics. Fast delivery, easy returns, and great prices make shopping a breeze.</p>
            {user?._id ? (
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow">Start Shopping</button>
                <button className="inline-flex items-center gap-2 bg-white border border-emerald-600 text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-emerald-50">Explore Categories</button>
              </div>
            ) : (
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow">Login to Start Shopping</button>
                <button className="inline-flex items-center gap-2 bg-white border border-emerald-600 text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-emerald-50">Explore Categories</button>
              </div>
            )}
          </div>
          <div className="w-full md:w-80">
            <div className="rounded-lg bg-gradient-to-tr from-emerald-100 to-white p-4">
              <div className="text-sm text-slate-600">Why FastCart</div>
              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li>Fast, reliable delivery</li>
                <li>Wide variety of categories</li>
                <li>Secure checkout & easy returns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-lime-400 text-white flex items-center justify-center font-semibold text-lg">{cat.title.charAt(0)}</div>
                  <div>
                    <div className="font-medium text-emerald-800">{cat.title}</div>
                    <div className="text-xs text-slate-500">{cat.desc}</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-slate-600">Browse</div>
                  <div className="text-xs text-emerald-600 font-semibold">View</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
