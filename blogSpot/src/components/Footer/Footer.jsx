import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">BlogSpot</h2>
            <p className="text-gray-400">
              A platform for sharing your thoughts and ideas with the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="/" className="hover:text-white">Home</a>
              </li>
              <li>
                <a href="/allpost" className="hover:text-white">All Posts</a>
              </li>
              <li>
                <a href="/addpost" className="hover:text-white">Add Post</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: captionharsh@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BlogSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
