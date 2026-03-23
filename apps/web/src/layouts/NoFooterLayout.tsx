import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const NoFooterLayout = () => (
  <>
    <div className="flex h-screen fixed inset-0 overflow-y-hidden">
      <Navbar />
      <main className=" w-full">
        <Outlet />
      </main>
    </div>
  </>
);

export default NoFooterLayout;
