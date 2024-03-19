
// components/layout/Footer.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 px-4 sm:px-8">
      <div className="container mx-auto text-center text-white">
        <p className="mb-2">&copy; {new Date().getFullYear()} Redsquare</p>
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
        <p className="text-sm">Sed leo. Cras varius metus sit amet felis. Donec lorem nulla, dignissim eget, condimentum id, ultricies eget, turpis. Pellentesque cursus luctus mauris.</p>
        <div className="mt-4 flex justify-center">
          <a href="#" className="text-blue-400 hover:text-blue-300 mr-4">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            Privacy Policy
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;