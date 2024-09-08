import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Portal</h2>
            <p className="text-sm">© 2024 Nagesh Mane.</p>
            <p className="text-sm"> All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.linkedin.com/in/nagesh-mane/" className="hover:text-gray-400" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
            </a>
            <a href="https://github.com" className="hover:text-gray-400" aria-label="GitHub">
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .296C5.373.296 0 5.67 0 12.296c0 5.292 3.438 9.785 8.205 11.385.599.112.82-.261.82-.579 0-.286-.01-1.043-.015-2.048-3.338.728-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.204.085 1.837 1.236 1.837 1.236 1.07 1.835 2.808 1.305 3.492.997.108-.774.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.235-3.222-.123-.305-.535-1.528.118-3.184 0 0 1.008-.322 3.302 1.23.958-.267 1.985-.4 3.005-.405 1.02.005 2.048.138 3.008.405 2.292-1.552 3.298-1.23 3.298-1.23.655 1.656.243 2.879.12 3.184.77.841 1.234 1.912 1.234 3.222 0 4.61-2.804 5.624-5.476 5.921.43.372.815 1.104.815 2.226 0 1.606-.015 2.898-.015 3.293 0 .32.22.695.824.576C20.565 22.073 24 17.585 24 12.296 24 5.67 18.627.296 12 .296z" />
  </svg>
</a>
<a href="https://instagram.com" className="hover:text-gray-400" aria-label="Instagram">
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.342-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.689 0 8.258.015 7.125.072 5.907.132 4.677.445 3.697 1.424 2.717 2.404 2.405 3.634 2.345 4.852.415 6.163 0 6.593 0 12s.415 5.837.072 7.125c.062 1.366.342 2.633 1.317 3.608.975.975 2.242 1.255 3.608 1.317 1.266.058 1.646.07 4.85.07s3.584-.012 4.85-.07c1.366-.062 2.633-.342 3.608-1.317.975-.975 1.255-2.242 1.317-3.608.058-1.266.07-1.646.07-4.85s-.012-3.584-.07-4.85c-.062-1.366-.342-2.633-1.317-3.608-.975-.975-2.242-1.255-3.608-1.317C15.584.015 15.204 0 12 0z" />
    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
</a>



          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;