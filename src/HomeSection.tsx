import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router';

export function HomeSection () {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full h-screen flex justify-center items-center'>
        <Outlet />
      </div>
    </QueryClientProvider>

)}
