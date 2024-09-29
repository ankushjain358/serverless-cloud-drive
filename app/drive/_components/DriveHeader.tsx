"use client";

import { signOut } from 'aws-amplify/auth';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';

const DriveHeader = () => {
  return (
    <nav className="bg-black flex-shrink-0">
      <div className="w-full mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/drive" className="text-white font-bold text-xl">
                Cloud Drive
              </Link>
            </div>
            <div className="hidden md:block">

            </div>
          </div>
          <div>
            <Button onClick={async () => { await signOut(); }}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DriveHeader;
