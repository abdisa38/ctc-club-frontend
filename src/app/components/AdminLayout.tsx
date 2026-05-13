import { Link, useLocation } from 'react-router';
import { LayoutDashboard, FileText, HelpCircle, Users, Trophy, MessageCircle, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Exams', href: '/admin/exams', icon: FileText },
  { name: 'Questions', href: '/admin/questions', icon: HelpCircle },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Messaging', href: '/admin/messaging', icon: MessageCircle },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-black text-white flex flex-col fixed inset-y-0 left-0 h-full z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Ofijan</p>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 lg:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 lg:hidden">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-sm font-semibold text-gray-700">Admin Panel</div>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close admin navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>
        <div className="px-4 lg:px-0">
          {children}
        </div>
      </div>
    </div>
  );
}
