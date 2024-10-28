import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.replace('/(tabs)'); 
      } else {
        router.replace('/(stack)/login'); 
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null; 

  return <Stack />;
}
