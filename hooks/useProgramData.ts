import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { ALPHABET_FIREBASE_CONFIG, ACCELERATOR_FIREBASE_CONFIG } from '@/constants/firebase';

interface ProgramData {
  app_start_date: Date;
  app_end_date: Date;
  program_start_date: Date;
}

interface HeroSection {
  id: string;
  applicationWindowOpens?: string;
  applicationWindowCloses?: string;
  programStartDate?: string;
  programEndDate?: string;
  isVisible: boolean;
  order: number;
}


export function useProgramData() {
  const [abData, setAbData] = useState<ProgramData | null>(null);
  const [acceleratorData, setAcceleratorData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        // Initialize Firebase apps for external projects
        const alphabetApp = initializeApp(ALPHABET_FIREBASE_CONFIG, 'alphabet');
        const alphabetDb = getFirestore(alphabetApp);
        
        const acceleratorApp = initializeApp(ACCELERATOR_FIREBASE_CONFIG, 'accelerator');
        const acceleratorDb = getFirestore(acceleratorApp);

        // Fetch Alpha-Bet data from hero-sections collection (no filters to avoid index requirements)
        const alphabetSnapshot = await getDocs(collection(alphabetDb, 'hero-sections'));
        
        if (!alphabetSnapshot.empty) {
          // Filter visible items and sort by order manually
          const visibleDocs = alphabetSnapshot.docs
            .filter(doc => doc.data().isVisible === true)
            .sort((a, b) => {
              const aOrder = a.data().order || 0;
              const bOrder = b.data().order || 0;
              return aOrder - bOrder;
            });
          
          if (visibleDocs.length > 0) {
            const alphabetHero = visibleDocs[0].data() as HeroSection;
            if (alphabetHero.applicationWindowOpens && alphabetHero.applicationWindowCloses && alphabetHero.programStartDate) {
              setAbData({
                app_start_date: new Date(alphabetHero.applicationWindowOpens),
                app_end_date: new Date(alphabetHero.applicationWindowCloses),
                program_start_date: new Date(alphabetHero.programStartDate)
              });
            }
          }
        }

        // Fetch Accelerator data from hero-sections collection (no filters to avoid index requirements)
        const acceleratorSnapshot = await getDocs(collection(acceleratorDb, 'hero-sections'));
        
        if (!acceleratorSnapshot.empty) {
          // Filter visible items and sort by order manually
          const visibleDocs = acceleratorSnapshot.docs
            .filter(doc => doc.data().isVisible === true)
            .sort((a, b) => {
              const aOrder = a.data().order || 0;
              const bOrder = b.data().order || 0;
              return aOrder - bOrder;
            });
          
          if (visibleDocs.length > 0) {
            const acceleratorHero = visibleDocs[0].data() as HeroSection;
            if (acceleratorHero.applicationWindowOpens && acceleratorHero.applicationWindowCloses && acceleratorHero.programStartDate) {
              setAcceleratorData({
                app_start_date: new Date(acceleratorHero.applicationWindowOpens),
                app_end_date: new Date(acceleratorHero.applicationWindowCloses),
                program_start_date: new Date(acceleratorHero.programStartDate)
              });
            }
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch program data:', err);
        setError('Failed to fetch program data');
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  return { abData, acceleratorData, loading, error };
}