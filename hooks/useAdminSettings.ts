"use client";
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface AdminSettings {
  abMode: 'notify' | 'status';
  acceleratorMode: 'notify' | 'status';
  lastUpdated: Date;
}

const defaultSettings: AdminSettings = {
  abMode: 'notify',
  acceleratorMode: 'notify',
  lastUpdated: new Date()
};

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load settings from Firestore
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'admin-settings', 'display-settings'));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data() as AdminSettings;
          setSettings({
            ...data,
            lastUpdated: data.lastUpdated?.toDate ? data.lastUpdated.toDate() : new Date(data.lastUpdated)
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to load admin settings:', err);
        setError('Failed to load settings');
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to Firestore
  const saveSettings = async (newSettings: Partial<AdminSettings>) => {
    setSaving(true);
    setError(null);
    
    try {
      const updatedSettings = {
        ...settings,
        ...newSettings,
        lastUpdated: new Date()
      };
      
      await setDoc(doc(db, 'admin-settings', 'display-settings'), updatedSettings);
      setSettings(updatedSettings);
    } catch (err) {
      console.error('Failed to save admin settings:', err);
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return {
    settings,
    loading,
    saving,
    error,
    saveSettings
  };
}