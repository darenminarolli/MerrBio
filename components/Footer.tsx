import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t bg-white py-12">
    <div className="container px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <span className="text-xl font-bold">MerrBio</span>
          </Link>
          <p className="mb-4 text-gray-600">
            Connecting you directly with local farmers for the freshest produce delivered to your door.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Shop</h3>
          <ul className="grid gap-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Vegetables
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Fruits
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Dairy & Eggs
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Meats
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Company</h3>
          <ul className="grid gap-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Our Farmers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Sustainability
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Help</h3>
          <ul className="grid gap-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center">
        <p className="text-gray-500">© {new Date().getFullYear()} MerrBio. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer