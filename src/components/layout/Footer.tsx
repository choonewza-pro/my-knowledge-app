import { Link } from "react-router-dom";
import { SITE_NAME, ROUTES, SITE_DESCRIPTION } from "../../utils/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: About */}
          <div>
            <h3 className="mb-4 text-lg font-bold">{SITE_NAME}</h3>
            <p className="text-sm text-base-content/70">{SITE_DESCRIPTION}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-primary">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-primary">
                  เกี่ยวกับ
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-primary">
                  ติดต่อ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
              >
                <i className="bi-github"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
              >
                <i className="bi-facebook"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-base-300 pt-8 text-center text-sm text-base-content/70">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
