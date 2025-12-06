import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

interface ProgramData {
  app_start_date: Date;
  app_end_date: Date;
  program_start_date: Date;
}

// Placeholder Firebase configs - will be replaced with actual configs
const ALPHABET_FIREBASE_CONFIG = {
  // Will be provided by user
};

const ACCELERATOR_FIREBASE_CONFIG = {
  // Will be provided by user
};

export function useProgramData() {
  const [abData, setAbData] = useState<ProgramData | null>(null);
  const [acceleratorData, setAcceleratorData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        // TODO: Replace with actual Firebase fetching when configs are provided
        // 
        // Example implementation:
        // const alphabetApp = initializeApp(ALPHABET_FIREBASE_CONFIG, 'alphabet');
        // const alphabetDb = getFirestore(alphabetApp);
        // const alphabetDoc = await getDoc(doc(alphabetDb, 'programs', 'alphabet'));
        // 
        // const acceleratorApp = initializeApp(ACCELERATOR_FIREBASE_CONFIG, 'accelerator');
        // const acceleratorDb = getFirestore(acceleratorApp);
        // const acceleratorDoc = await getDoc(doc(acceleratorDb, 'programs', 'accelerator'));

        // For now, set placeholder data
        setAbData({
          app_start_date: new Date('2024-12-01'),
          app_end_date: new Date('2025-01-15'),
          program_start_date: new Date('2025-11-01')
        });

        setAcceleratorData({
          app_start_date: new Date('2025-12-01'),
          app_end_date: new Date('2026-02-15'),
          program_start_date: new Date('2026-03-01')
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch program data');
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  return { abData, acceleratorData, loading, error };
}