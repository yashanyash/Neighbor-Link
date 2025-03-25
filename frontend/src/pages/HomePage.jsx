import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-700 text-white rounded-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Connect with your neighbors and build a stronger community
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Neighbor Link helps you find local help and offer your skills to neighbors in need
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/request-help" className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg shadow-md text-center">
                Request Help
              </Link>
              <Link to="/offer-service" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg border border-blue-500 shadow-md text-center">
                Offer a Service
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Neighbors helping each other" 
              className="rounded-lg shadow-xl" 
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Neighbor Link Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple steps to connect with your neighbors and get the help you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Post Your Need</h3>
              <p className="mt-4 text-gray-600">
                Create a request describing what you need help with, or offer a service you can provide to others.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Connect & Communicate</h3>
              <p className="mt-4 text-gray-600">
                Neighbors can reach out to you, or you can contact someone who can help with your needs.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Get Things Done</h3>
              <p className="mt-4 text-gray-600">
                Meet up and help each other out. Build stronger community bonds while solving everyday problems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 rounded-xl py-12 px-4 sm:px-6 md:py-16 mt-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to connect with your neighbors?
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            Join our community today and start exchanging help with your neighbors.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/request-help" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow-md">
              Request Help Now
            </Link>
            <Link to="/offer-service" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium shadow-md">
              Offer Your Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;