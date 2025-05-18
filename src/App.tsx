import { Outlet, useLocation, useNavigation } from 'react-router-dom'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useEffect } from 'react'

export default function App() {
  const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 bg-sidebar relative">
        {navigation.state === "loading" && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-dali-blue border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading...</span>
            </div>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
} 