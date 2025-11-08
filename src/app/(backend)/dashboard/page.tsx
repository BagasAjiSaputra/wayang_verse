"use client";

import React, { useState } from 'react';
import { Menu, X, Bell, Settings, LogOut, Search, Eye, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoveringHamburger, setHoveringHamburger] = useState(false);

  const wayangData = [
    { id: 1, name: 'Arjuna', type: 'Pandawa', views: 1240, status: 'Aktif' },
    { id: 2, name: 'Karna', type: 'Kurawa', views: 980, status: 'Aktif' },
    { id: 3, name: 'Dewi Srikandi', type: 'Pandawa', views: 875, status: 'Aktif' },
    { id: 4, name: 'Bima', type: 'Pandawa', views: 1120, status: 'Aktif' },
    { id: 5, name: 'Duryodana', type: 'Kurawa', views: 650, status: 'Nonaktif' },
  ];

  const stats = [
    { title: 'Total Tokoh', value: '128', change: '+12%', icon: '🎭', color: 'from-amber-500 to-amber-600' },
    { title: 'Cerita Wayang', value: '24', change: '+5%', icon: '📖', color: 'from-green-500 to-green-600' },
    { title: 'Model 3D', value: '16', change: '+8%', icon: '🎨', color: 'from-blue-500 to-blue-600' },
    { title: 'AI Generated', value: '42', change: '+23%', icon: '🤖', color: 'from-purple-500 to-purple-600' },
  ];

  const sidebarWidth = sidebarOpen || hoveringHamburger ? 'w-64' : 'w-20';
  const mainMargin = sidebarOpen || hoveringHamburger ? 'ml-64' : 'ml-20';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarWidth} bg-gradient-to-b from-amber-900 to-amber-950 text-white transition-all duration-300 fixed h-full z-40 overflow-y-auto`}
        onMouseEnter={() => setHoveringHamburger(true)}
        onMouseLeave={() => setHoveringHamburger(false)}
      >
        <div className="p-4 flex items-center justify-between">
          {(sidebarOpen || hoveringHamburger) && <h1 className="text-xl font-bold">🎭 Wayang</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-amber-800 p-2 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8 space-y-2 px-3">
          {[
            { icon: '📊', label: 'Dashboard', id: 'dashboard' },
            { icon: '📜', label: 'Sejarah', id: 'sejarah' },
            { icon: '🤖', label: 'AI Wayang', id: 'ai' },
            { icon: '🎨', label: '3D Model', id: '3d' },
            { icon: '⚙️', label: 'Pengaturan', id: 'settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id ? 'bg-amber-700' : 'hover:bg-amber-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {(sidebarOpen || hoveringHamburger) && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${mainMargin} flex flex-col transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari tokoh wayang..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="relative hover:bg-gray-100 p-2 rounded-lg transition">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="hover:bg-gray-100 p-2 rounded-lg transition">
                <Settings size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button className="hover:bg-red-100 p-2 rounded-lg transition">
                  <LogOut size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang di Dashboard Wayang</h1>
                <p className="text-gray-600">Kelola koleksi tokoh wayang Indonesia Anda dengan mudah</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium opacity-90">{stat.title}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <p className="text-sm mt-2 opacity-75">📈 {stat.change} dari bulan lalu</p>
                      </div>
                      <span className="text-4xl opacity-50">{stat.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
                  <h3 className="font-semibold text-gray-900 mb-2">📚 Cerita Populer</h3>
                  <p className="text-3xl font-bold text-amber-600 mb-2">Mahabharata</p>
                  <p className="text-sm text-gray-600">Cerita epik terpopuler dengan 2,847 views</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2">🎭 Tokoh Favorit</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">Arjuna</p>
                  <p className="text-sm text-gray-600">Tokoh dengan views tertinggi bulan ini</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2">👥 Pengguna Aktif</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">1,234</p>
                  <p className="text-sm text-gray-600">Pengguna aktif dalam 30 hari terakhir</p>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Tokoh Wayang Terpopuler</h3>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    + Tambah Tokoh
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Golongan</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {wayangData.map((item) => (
                        <tr key={item.id} className="hover:bg-amber-50 transition">
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{item.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{item.views.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                              item.status === 'Aktif'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <button className="text-blue-600 hover:text-blue-900 transition" title="Lihat">
                                <Eye size={18} />
                              </button>
                              <button className="text-amber-600 hover:text-amber-900 transition" title="Edit">
                                <Edit size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-900 transition" title="Hapus">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Halaman {activeTab}</h2>
              <p className="text-gray-600">Konten untuk halaman {activeTab} akan ditampilkan di sini.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
