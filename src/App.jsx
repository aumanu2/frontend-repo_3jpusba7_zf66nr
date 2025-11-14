import { useEffect, useState } from 'react'
import { ShoppingBag, Star, Store, IndianRupee, ChevronRight } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A237E] tracking-tight">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  )
}

function CategoryCard({ name, img }) {
  return (
    <a href={`/shop?category=${encodeURIComponent(name)}`} className="group">
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 overflow-hidden">
        <img src={img} alt={name} className="h-40 w-full object-cover rounded-lg group-hover:scale-[1.02] transition" />
        <div className="flex items-center justify-between mt-4">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#1A237E]" />
        </div>
      </div>
    </a>
  )
}

function ValueCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#880E4F]" />
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  )
}

function ProductCard({ p }) {
  return (
    <a href={`/product/${p.slug}`} className="group">
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
        <img src={p.images?.[0]} alt={p.title} className="h-52 w-full object-cover rounded-lg" />
        <div className="mt-3">
          <h4 className="font-semibold text-gray-800 line-clamp-1">{p.title}</h4>
          <p className="text-sm text-gray-500">Sold by {p.vendor_slug.replace('-', ' ')}</p>
          <p className="mt-1 font-bold text-[#880E4F]">₹ {(p.price_in_paise/100).toLocaleString('en-IN')}</p>
        </div>
      </div>
    </a>
  )
}

export default function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    // fetch featured products and categories
    fetch(`${BACKEND_URL}/api/products?limit=8`)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]))

    fetch(`${BACKEND_URL}/api/categories`)
      .then(r => r.json())
      .then(setCategories)
      .catch(() => setCategories([
        { name: 'Banarasi', slug: 'banarasi' },
        { name: 'Kanjivaram', slug: 'kanjivaram' },
        { name: 'Cotton', slug: 'cotton' },
        { name: 'Silk', slug: 'silk' },
        { name: 'Organza', slug: 'organza' },
      ]))
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-2xl font-extrabold tracking-tight" style={{fontFamily:'Playfair Display'}}>
            <span className="text-[#880E4F]">Saree</span> <span className="text-[#1A237E]">Sanctuary</span>
          </a>
          <nav className="flex items-center gap-6 text-sm text-gray-700">
            <a href="#how" className="hover:text-[#1A237E]">How it works</a>
            <a href="#sell" className="hover:text-[#1A237E]">Sell</a>
            <a href="/test" className="hover:text-[#1A237E]">System Test</a>
            <button className="inline-flex items-center gap-2 bg-[#FFD700] text-[#333] px-4 py-2 rounded-md font-medium">
              <Store className="w-4 h-4" /> Become a Seller
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A237E] to-[#880E4F] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Your Saree. Your Price. Your Profit.</h1>
            <p className="mt-4 text-white/90">Zero-commission marketplace empowering artisans. Keep 100% of your profit with a flat ₹500/year membership.</p>
            <div className="mt-6 flex gap-3">
              <a href="#sell" className="bg-[#FFD700] text-black px-5 py-3 rounded-md font-semibold">Sell Your Sarees</a>
              <a href="#shop" className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-md font-semibold">Shop Authentic Sarees</a>
            </div>
          </div>
          <div className="hidden md:block">
            <img className="rounded-xl shadow-2xl" src="https://images.unsplash.com/photo-1625850864233-90c8dc3a35ac?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTYXJlZSUyMEhlcm98ZW58MHwwfHx8MTc2MzEwNDY0MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Saree Hero" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 py-14" id="values">
        <div className="grid md:grid-cols-3 gap-6">
          <ValueCard icon={IndianRupee} title="Zero Commission" text="Vendors keep 100% of profits. Pay only ₹500/year." />
          <ValueCard icon={Store} title="Authentic & Direct" text="Buy directly from verified artisans and boutiques." />
          <ValueCard icon={Star} title="Quality & Trust" text="Transparent policies, real reviews, human connection." />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-6" id="shop">
        <SectionTitle title="Explore by Category" subtitle="Banarasi • Kanjivaram • Cotton • Silk • Organza" />
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-5">
          {(categories || []).map((c, i) => (
            <CategoryCard
              key={i}
              name={c.name}
              img={`https://source.unsplash.com/collection/3816149/400x300?sig=${i}`}
            />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionTitle title="Featured Sarees" subtitle="Handpicked treasures from our vendors" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {(products || []).map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white" id="how">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <SectionTitle title="How It Works" subtitle="Simple, transparent flows for sellers and buyers" />
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#880E4F]">For Sellers</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Register & verify your store</li>
                <li>Pay ₹500 annual fee</li>
                <li>Upload sarees with pricing freedom</li>
                <li>Receive orders</li>
                <li>Dispatch & upload courier proof</li>
                <li>Get paid securely</li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#1A237E]">For Buyers</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Browse authentic sarees</li>
                <li>Pay securely online</li>
                <li>Track your order</li>
                <li>Receive your saree</li>
                <li>Review the seller</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-[#111] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold">Ready to join the movement?</h3>
            <p className="text-white/80 mt-2">If you get zero orders in your first month, we’ll refund your ₹500.</p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <a href="#sell" className="bg-[#FFD700] text-black px-5 py-3 rounded-md font-semibold">Become a Seller</a>
            <a href="#shop" className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-md font-semibold">Explore Sarees</a>
          </div>
        </div>
        <div className="text-center text-xs text-white/60 py-4 border-t border-white/10">© {new Date().getFullYear()} Saree Sanctuary</div>
      </footer>
    </div>
  )
}
