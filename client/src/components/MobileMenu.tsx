import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { path: string; label: string }[];
  currentLocation: string;
}

const MobileMenu = ({ isOpen, onClose, navItems, currentLocation }: MobileMenuProps) => {
  if (!isOpen) return null;

  const isActive = (path: string) => {
    if (path === "/" && currentLocation === "/") return true;
    if (path !== "/" && currentLocation.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              onClick={onClose}
              className={`block px-3 py-2 rounded-md text-base font-medium smooth-transition ${
                isActive(item.path)
                  ? "text-primary bg-primary/5"
                  : "text-slate-700 hover:text-primary hover:bg-slate-50"
              }`}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
