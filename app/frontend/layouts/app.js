import { Outlet } from 'react-router';
import TopNavbar from '@/components/top-navbar';

export default function AppLayout() {
  return (
    <>
      <TopNavbar />
      <div className="px-4 sm:px-8 md:px-16">
        <Outlet />
      </div>
    </>
  );
}