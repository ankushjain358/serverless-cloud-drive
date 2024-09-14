import Link from 'next/link';

const DriveFooter = () => {
    return (
        <footer className="bg-gray-800 py-4 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <Link href="/" className="text-white font-bold text-xl">
                        Cloud Drive
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default DriveFooter;
