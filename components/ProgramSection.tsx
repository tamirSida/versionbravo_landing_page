"use client";
import { useState } from 'react';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { useProgramData } from '@/hooks/useProgramData';
import { APPLICATION_URLS } from '@/constants/urls';
import NotificationSignupForm from './NotificationSignupForm';

interface ProgramSectionProps {
  type: 'ab' | 'accelerator';
  title: string;
  subtitle: string;
  defaultLaunchText: string;
  defaultApplicationText: string;
  description: string;
  websiteUrl: string;
  expandedCard: 'none' | 'accelerator' | 'alphaBet';
  onToggle: () => void;
}

export default function ProgramSection({
  type,
  title,
  subtitle,
  defaultLaunchText,
  defaultApplicationText,
  description,
  websiteUrl,
  expandedCard,
  onToggle
}: ProgramSectionProps) {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  
  const { settings, loading: settingsLoading } = useAdminSettings();
  const { abData, acceleratorData, loading: dataLoading } = useProgramData();

  const programData = type === 'ab' ? abData : acceleratorData;
  const mode = type === 'ab' ? settings.abMode : settings.acceleratorMode;
  const applicationUrl = type === 'ab' ? APPLICATION_URLS.ALPHA_BET : APPLICATION_URLS.ACCELERATOR;

  const getApplicationStatus = () => {
    if (!programData) return { text: 'Loading...', showButton: false };
    
    const now = new Date();
    const { app_start_date, app_end_date } = programData;
    
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

  const renderDateSection = () => {
    if (settingsLoading) {
      return (
        <div className="mb-4 md:mb-6 text-sm text-gray-600">
          <div className="mb-1">Loading...</div>
        </div>
      );
    }

    if (mode === 'notify') {
      return (
        <button 
          onClick={() => setShowNotificationModal(true)}
          className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 md:px-6 py-3 rounded font-medium transition-colors text-center text-sm md:text-base mb-4 md:mb-6"
          style={{ fontFamily: "'Gunplay', sans-serif" }}
        >
          Notify me when applications open
        </button>
      );
    }

    // Status mode
    if (dataLoading || !programData) {
      return (
        <div className="mb-4 md:mb-6 text-sm text-gray-600">
          <div className="mb-1">Loading program data...</div>
        </div>
      );
    }

    const applicationStatus = getApplicationStatus();

    return (
      <div className="mb-4 md:mb-6 text-sm text-gray-600">
        <div className="mb-1">Launch: {programData.program_start_date.toLocaleDateString()}</div>
        <div className="mb-1">
          Applications: {applicationStatus.text}
          {applicationStatus.showButton && (
            <div className="mt-2">
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
              >
                Apply Now
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow min-h-[400px] flex flex-col">
      <h3 className="text-lg md:text-xl font-bold text-black mb-2" style={{ fontFamily: "'Gunplay', sans-serif" }}>
        {title}
      </h3>
      <p className="text-blue-600 mb-4 font-semibold text-sm md:text-base">{subtitle}</p>
      
      {renderDateSection()}
      
      <button 
        onClick={onToggle}
        className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-4 flex items-center cursor-pointer"
      >
        {(type === 'ab' && expandedCard === 'alphaBet') || (type === 'accelerator' && expandedCard === 'accelerator') ? 'Show Less' : 'Read More'}
        <i className={`fas fa-chevron-${(type === 'ab' && expandedCard === 'alphaBet') || (type === 'accelerator' && expandedCard === 'accelerator') ? 'up' : 'down'} ml-2 transition-transform duration-200`}></i>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        (type === 'ab' && expandedCard === 'alphaBet') || (type === 'accelerator' && expandedCard === 'accelerator') ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gray-50 rounded p-3 md:p-4 text-gray-700 text-sm leading-relaxed">
          {description}
        </div>
      </div>
      
      <div className="flex-1"></div>
      
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-3 rounded font-semibold transition-colors text-center text-sm md:text-base"
        style={{ fontFamily: "'Gunplay', sans-serif" }}
      >
        {title} Website
      </a>
      
      <NotificationSignupForm
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        programType={type === 'ab' ? 'alpha-bet' : 'accelerator'}
      />
    </article>
  );
}