import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ErrorBoundary from './components/error-boundary'
import './index.css'
import Education, { loader as educationLoader } from './routes/education'
import Home from './routes/index'
import About from './routes/about'
import People from './routes/people'
import Projects from './routes/projects'
import ProjectDetail, { loader as projectDetailLoader } from './routes/projects/$id'
import MemberApplication from './routes/application.member'
import PartnerApplication from './routes/application.partner'
import peopleLoader from './routes/people/loader'
import projectsLoader from './routes/projects/loader'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "people",
        element: <People />,
        loader: peopleLoader
      },
      {
        path: "projects",
        element: <Projects />,
        loader: projectsLoader
      },
      {
        path: "projects/:id",
        element: <ProjectDetail />,
        loader: projectDetailLoader
      },
      {
        path: "application/member",
        element: <MemberApplication />
      },
      {
        path: "application/partner",
        element: <PartnerApplication />
      },
      {
        path: "education",
        element: <Education />,
        loader: educationLoader
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
) 