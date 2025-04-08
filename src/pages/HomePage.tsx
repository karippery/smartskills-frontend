// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export const HomePage = () => {
    const { user } = useAuthContext();
  
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        {/* Hero Section with glassmorphism */}
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-blue-300/20 to-purple-300/20 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-white/20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-900 mb-6 drop-shadow-lg">
              Smart-Skill: Workforce Intelligence Platform
            </h1>
            <p className="text-xl text-primary-900 max-w-3xl mx-auto">
              Optimize your talent management by tracking, analyzing, and leveraging employee skills across your organization
            </p>
  
            <div className="mt-10 flex justify-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-blue-600 text-primary-900 rounded-md shadow hover:bg-blue-700 transition"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-6 py-3 bg-blue-600 text-primary-900 rounded-md shadow hover:bg-blue-700 transition"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
  
        {/* Value Proposition */}
        <div className="w-full max-w-7xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Skill Inventory",
              description: "Comprehensive database of employee skills and proficiency levels",
              icon: "📊"
            },
            {
              title: "Smart Matching",
              description: "Find the perfect candidate for any project based on required skills",
              icon: "🔍"
            },
            {
              title: "Gap Analysis",
              description: "Identify skill gaps across teams and plan targeted training",
              icon: "📈"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/20 text-primary-900"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-primary-900/80">{feature.description}</p>
            </div>
          ))}
        </div>
  
        {/* How It Works */}
        <div className="mt-24 w-full max-w-4xl bg-gradient-to-br from-blue-300/20 to-purple-300/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 text-primary-900">
          <h2 className="text-2xl font-bold text-center mb-10">How Smart-Skill Works</h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Employee Profiles",
                description: "Each employee maintains an updated profile with their skills and proficiency levels"
              },
              {
                step: "2",
                title: "Project Requirements",
                description: "Managers define required skills for projects or positions"
              },
              {
                step: "3",
                title: "Intelligent Matching",
                description: "Our algorithm suggests the best candidates based on skill fit"
              }
            ].map((item) => (
              <div key={item.step} className="flex items-start">
                <div className="flex-shrink-0 bg-blue-600 text-primary-900 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-primary-900/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">Ready to optimize your workforce?</h2>
          <Link
            to={user ? "/employees" : "/register"}
            className="inline-block px-8 py-3 bg-blue-600 text-primary-900 rounded-md shadow hover:bg-blue-700 transition"
          >
            {user ? "Browse Employees" : "Get Started Now"}
          </Link>
        </div>
      </div>
    );
  };
  