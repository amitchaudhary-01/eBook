import React, { useState } from 'react';
import { 
  Store, 
  BookMarked, 
  DownloadCloud, 
  Bell, 
  ShieldCheck, 
  Save, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

const AdminSystemSetting = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaved, setIsSaved] = useState(false);

  // Initial Settings State
  const initialSettings = {
    storeName: 'BookStore Platform',
    supportEmail: 'support@bookstore.com',
    currency: 'USD',
    maintenanceMode: false,
    defaultRentalDays: 14,
    lateFeePerDay: 1.50,
    maxActiveRentalsPerUser: 5,
    maxFileSizeMB: 50,
    enableWatermark: true,
    emailAlertsOnNewOrder: true,
    rentalOverdueReminders: true,
    requireEmailVerification: true,
    enableTwoFactorAdmin: false
  };

  const [settings, setSettings] = useState(initialSettings);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
    setIsSaved(false);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect your API call here e.g., axios.put('/api/settings', settings)
    console.log('Saved settings:', settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'rentals', label: 'Rentals & Pricing', icon: BookMarked },
    { id: 'ebooks', label: 'E-Books & Files', icon: DownloadCloud },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6 text-slate-800">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage platform configuration and rental rules.</p>
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              Settings saved!
            </span>
          )}
          
          <button 
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium px-3.5 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            Reset
          </button>
          
          <button 
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Navigation Tabs */}
        <nav className="bg-white border border-slate-200/80 rounded-xl p-2 space-y-1 shadow-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Form Panel */}
        <div className="md:col-span-3 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">Store Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Store Title</label>
                    <input 
                      type="text" 
                      value={settings.storeName}
                      onChange={(e) => handleInputChange('storeName', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Support Email</label>
                    <input 
                      type="email" 
                      value={settings.supportEmail}
                      onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Maintenance Mode</p>
                    <p className="text-xs text-slate-500">Temporarily disable store access for users.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('maintenanceMode')}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      settings.maintenanceMode ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Rentals Tab */}
            {activeTab === 'rentals' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">Book Rental Policies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Default Rental Period (Days)</label>
                    <input 
                      type="number" 
                      value={settings.defaultRentalDays}
                      onChange={(e) => handleInputChange('defaultRentalDays', Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Late Fee / Day ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={settings.lateFeePerDay}
                      onChange={(e) => handleInputChange('lateFeePerDay', Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Max Rentals / User</label>
                    <input 
                      type="number" 
                      value={settings.maxActiveRentalsPerUser}
                      onChange={(e) => handleInputChange('maxActiveRentalsPerUser', Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* E-Books Tab */}
            {activeTab === 'ebooks' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">Digital E-Book Configurations</h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Max Upload Size (MB)</label>
                  <input 
                    type="number" 
                    value={settings.maxFileSizeMB}
                    onChange={(e) => handleInputChange('maxFileSizeMB', Number(e.target.value))}
                    className="w-full max-w-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Digital Watermarking</p>
                    <p className="text-xs text-slate-500">Stamp downloaded PDFs with user info.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('enableWatermark')}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      settings.enableWatermark ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.enableWatermark ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">Email Preferences</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">New Order Alerts</p>
                    <p className="text-xs text-slate-500">Notify admin when books are purchased.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('emailAlertsOnNewOrder')}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      settings.emailAlertsOnNewOrder ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.emailAlertsOnNewOrder ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">Security Settings</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Require Email Verification</p>
                    <p className="text-xs text-slate-500">Require email confirmation before purchases.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('requireEmailVerification')}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      settings.requireEmailVerification ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.requireEmailVerification ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>

    </div>
  );
};

export default AdminSystemSetting;