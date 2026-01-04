import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-emerald-50 border-t border-emerald-200 text-emerald-900">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <FiShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg">FastCart</div>
              <div className="text-sm text-emerald-700">Smart shopping made simple</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-2">Company</h4>
              <ul className="text-sm space-y-1 text-emerald-700">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Support</h4>
              <ul className="text-sm space-y-1 text-emerald-700">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Legal</h4>
              <ul className="text-sm space-y-1 text-emerald-700">
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Follow</h4>
              <ul className="text-sm space-y-1 text-emerald-700">
                <li>Twitter</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-100 pt-4 text-sm text-emerald-700 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {year} FastCart. All rights reserved.</div>
          <div className="text-xs">Built with care — simple, fast, and reliable shopping.</div>
        </div>
      </div>
    </footer>
  )
}
