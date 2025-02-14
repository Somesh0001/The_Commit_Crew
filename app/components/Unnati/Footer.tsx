// import React from "react";


// interface LinkItem {
//   href: string;
//   label: string;
// }

// const quickLinks: LinkItem[] = [
//   { href: "/home", label: "Home" },
//   { href: "/services", label: "Services" },
//   { href: "/contact", label: "Contact" },
// ];

// const Footer: React.FC = () => {
//   return (
//     <footer className={styles.footerContainer}>
//       <div className={styles.footerWrapper}>
//         <div className={styles.footerSection}>
//           <h3>About Us</h3>
//           <p>We are committed to providing the best service to our customers.</p>
//         </div>
//         <div className={styles.footerSection}>
//           <h3>Quick Links</h3>
//           <ul>
//             {quickLinks.map((link) => (
//               <li key={link.href}>
//                 <a href={link.href}>{link.label}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className={styles.footerSection}>
//           <h3>Contact</h3>
//           <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
//           <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
//         </div>
//       </div>
//       <div className={styles.footerCopyRight}>
//         <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-semibold">YourBrand</h2>
          <p className="text-gray-400 mt-2">
            Building the future, one step at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-medium">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-400 hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-medium">Follow Us</h3>
          <div className="mt-3 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
