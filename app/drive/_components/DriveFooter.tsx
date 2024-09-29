import Link from 'next/link';

const DriveFooter = () => {
    return (
        <footer className="bg-black flex-shrink-0">
            <div className="w-full mx-auto px-4 lg:px-20">
                <div className="flex justify-center h-16 items-center">
                    <Link href="/" className="text-white font-bold text-xl">
                        Cloud Drive
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default DriveFooter;
