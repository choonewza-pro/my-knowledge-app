import { Link } from 'react-router-dom';
import { navigationItems } from '../../data/navigation';
import { SITE_NAME } from '../../utils/constants';

export function Navbar() {
  return (
    <div className="w-full navbar bg-base-100 shadow-sm">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <i className="bi-list text-xl"></i>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2">
        <Link to="/" className="text-xl font-bold">
          {SITE_NAME}
        </Link>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal px-1">
          {navigationItems.map((item, index) => {
            if (item.children) {
              return (
                <li key={index}>
                  <details>
                    <summary>{item.label}</summary>
                    <ul>
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link to={child.path}>
                            {child.icon && <i className={`${child.icon} mr-2`}></i>}
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}