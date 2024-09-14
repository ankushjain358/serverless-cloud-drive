import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbLink {
    name: string;
    href: string;
}

interface BreadcrumbProps {
    breadcrumbs: BreadcrumbLink[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
    return (
        <div className="py-4">
            <div className="flex justify-between items-center">
                {/* Breadcrumb */}
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        {breadcrumbs.map((item, index) => (
                            <li key={index} className="inline-flex items-center">
                                {index > 0 && <ChevronRight className="w-5 h-5 text-gray-400" />}
                                <Link
                                    href={item.href}
                                    className={`inline-flex items-center text-sm font-medium ${index === breadcrumbs.length - 1
                                        ? 'text-gray-700'
                                        : 'text-blue-600 hover:text-blue-800'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumb;
