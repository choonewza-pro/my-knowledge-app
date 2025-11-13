import { Outlet, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/layout';
import { navigationItems } from '../data/navigation';

export function MainLayout() {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="flex-1 bg-base-100">
          <Outlet />
        </main>
        <Footer />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100">
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