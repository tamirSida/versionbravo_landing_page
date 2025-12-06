"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminSettings } from '@/hooks/useAdminSettings';

export default function AdminSettings() {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'ab' | 'accelerator'>('ab');
  
  const { user, signOutUser } = useAuth();
  const { settings, loading, saving, error, saveSettings } = useAdminSettings();

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOutUser();
    setShowSettings(false);
  };

  const handleSaveAB = async () => {
    await saveSettings({ abMode: settings.abMode });
  };

  const handleSaveAccelerator = async () => {
    await saveSettings({ acceleratorMode: settings.acceleratorMode });
  };

  return (
    <>
      {/* Settings Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowSettings(true)}
          className="text-blue-700 hover:text-blue-800 transition-colors font-bold text-sm tracking-wider"
        >
          SETTINGS
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowSettings(false)}>
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black" style={{ fontFamily: "'Gunplay', sans-serif" }}>
                  Admin Settings
                </h3>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Sign Out
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('ab')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'ab'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Alpha-Bet
                </button>
                <button
                  onClick={() => setActiveTab('accelerator')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'accelerator'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Accelerator
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {loading && (
                  <div className="text-center text-gray-500">Loading settings...</div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {!loading && activeTab === 'ab' && (
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-4">Alpha-Bet School</h4>
                    
                    {/* Radio Toggle */}
                    <div className="mb-6">
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="ab-mode"
                            checked={settings.abMode === 'notify'}
                            onChange={() => saveSettings({ abMode: 'notify' })}
                            className="mr-2"
                          />
                          Notify Me
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="ab-mode"
                            checked={settings.abMode === 'status'}
                            onChange={() => saveSettings({ abMode: 'status' })}
                            className="mr-2"
                          />
                          Application Status
                        </label>
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className="bg-gray-50 p-4 rounded mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>Current Display Mode:</strong> {settings.abMode === 'notify' ? 'Notify Me' : 'Application Status'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last updated: {settings.lastUpdated.toLocaleString()}
                      </p>
                    </div>

                    {saving && (
                      <div className="text-blue-600 text-sm">Saving changes...</div>
                    )}
                  </div>
                )}

                {!loading && activeTab === 'accelerator' && (
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-4">Vetted Accelerator</h4>
                    
                    {/* Radio Toggle */}
                    <div className="mb-6">
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accelerator-mode"
                            checked={settings.acceleratorMode === 'notify'}
                            onChange={() => saveSettings({ acceleratorMode: 'notify' })}
                            className="mr-2"
                          />
                          Notify Me
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accelerator-mode"
                            checked={settings.acceleratorMode === 'status'}
                            onChange={() => saveSettings({ acceleratorMode: 'status' })}
                            className="mr-2"
                          />
                          Application Status
                        </label>
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className="bg-gray-50 p-4 rounded mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>Current Display Mode:</strong> {settings.acceleratorMode === 'notify' ? 'Notify Me' : 'Application Status'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last updated: {settings.lastUpdated.toLocaleString()}
                      </p>
                    </div>

                    {saving && (
                      <div className="text-blue-600 text-sm">Saving changes...</div>
                    )}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}