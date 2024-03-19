// components/layout/Header.js

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCar, faWrench } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'

const Header = () => {
    return (
        <header className="bg-gray-800 py-4 px-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-white text-lg font-semibold">
                        <span className="mr-4">
                            <FontAwesomeIcon icon={faHome} className="" className="mr-1" />
                        </span>
                        Vehicle Maintenance
                    </h1>
                </Link>
                <nav className="flex space-x-4">
                    <Link href="/vehicle">
                        <span className="text-white flex items-center hover:text-gray-300">
                            <FontAwesomeIcon icon={faCar} className="mr-1" /> Vehicles
                        </span>
                    </Link>
                    <Link href="/maintenance">
                        <span className="text-white flex items-center hover:text-gray-300">
                            <FontAwesomeIcon icon={faWrench} className="mr-1" /> Maintenance
                        </span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header