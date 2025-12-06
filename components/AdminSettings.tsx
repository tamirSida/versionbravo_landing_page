"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { APPLICATION_URLS } from '@/constants/urls';
import { useProgramData } from '@/hooks/useProgramData';

interface ProgramData {
  app_start_date: Date;
  app_end_date: Date;
  program_start_date: Date;
}

type ViewMode = 'notify' | 'status';

export default function AdminSettings() {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'ab' | 'accelerator'>('ab');
  const [abViewMode, setAbViewMode] = useState<ViewMode>('notify');
  const [acceleratorViewMode, setAcceleratorViewMode] = useState<ViewMode>('notify');
  
  const { user, signOutUser } = useAuth();
  const { abData, acceleratorData, loading, error } = useProgramData();

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOutUser();
    setShowSettings(false);
  };

  const getApplicationStatus = (data: ProgramData | null) => {
    if (!data) return { text: 'Loading...', showButton: false };
    
    const now = new Date();
    const { app_start_date, app_end_date } = data;
    
    if (now < app_start_date) {
      return {
        text: `Applications will open on ${app_start_date.toLocaleDateString()}`,
        showButton: false
      };
    } else if (now >= app_start_date && now <= app_end_date) {
      return {
        text: 'Applications are open',
        showButton: true
      };
    } else {
      return {
        text: 'Applications are currently closed',
        showButton: false
      };
    }
  };

  const renderProgramContent = (
    viewMode: ViewMode,
    programData: ProgramData | null,
    applicationUrl: string,
    defaultLaunchText: string,
    defaultApplicationText: string
  ) => {
    if (viewMode === 'notify') {
      return (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <div className="mb-1">{defaultLaunchText}</div>
            <div className="mb-1">{defaultApplicationText}</div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors">
            Notify me when applications open
          </button>
        </div>
      );
    }

    if (!programData) {
      return <div className="text-gray-500">Loading program data...</div>;
    }

    const applicationStatus = getApplicationStatus(programData);

    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          <div className="mb-1">Launch: {programData.program_start_date.toLocaleDateString()}</div>
          <div className="mb-1">Applications: {applicationStatus.text}</div>
        </div>
        {applicationStatus.showButton && (
          <a
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors text-center"
          >
            Apply Now
          </a>
        )}
      </div>
    );
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
                {activeTab === 'ab' && (
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-4">Alpha-Bet School</h4>
                    
                    {/* Radio Toggle */}
                    <div className="mb-6">
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="ab-mode"
                            checked={abViewMode === 'notify'}
                            onChange={() => setAbViewMode('notify')}
                            className="mr-2"
                          />
                          Notify Me
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="ab-mode"
                            checked={abViewMode === 'status'}
                            onChange={() => setAbViewMode('status')}
                            className="mr-2"
                          />
                          Application Status
                        </label>
                      </div>
                    </div>

                    {/* Content */}
                    {renderProgramContent(
                      abViewMode,
                      abData,
                      APPLICATION_URLS.ALPHA_BET,
                      'Launch: November 2025',
                      'Applications: Open Now'
                    )}
                  </div>
                )}

                {activeTab === 'accelerator' && (
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-4">Vetted Accelerator</h4>
                    
                    {/* Radio Toggle */}
                    <div className="mb-6">
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accelerator-mode"
                            checked={acceleratorViewMode === 'notify'}
                            onChange={() => setAcceleratorViewMode('notify')}
                            className="mr-2"
                          />
                          Notify Me
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accelerator-mode"
                            checked={acceleratorViewMode === 'status'}
                            onChange={() => setAcceleratorViewMode('status')}
                            className="mr-2"
                          />
                          Application Status
                        </label>
                      </div>
                    </div>

                    {/* Content */}
                    {renderProgramContent(
                      acceleratorViewMode,
                      acceleratorData,
                      APPLICATION_URLS.ACCELERATOR,
                      'Launch: March 2026',
                      'Applications: December 2025'
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