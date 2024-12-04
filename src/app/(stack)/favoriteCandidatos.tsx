// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
// import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// import { useLocalSearchParams, router } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface User {
//   id: string;
//   nome: string;
//   area_atuacao: string;
//   profileImageUrl: string;
//   bannerImageUrl: string;
//   resumo: string;
// }

// const CandidatosVaga: React.FC = () => {
//   const { vagaId, titulo } = useLocalSearchParams() as { vagaId: string; titulo: string };

//   const [candidatos, setCandidatos] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCandidatos = async () => {
//     setIsLoading(true);
//     const firestore = getFirestore();

//     try {
//       const candidaturaRef = collection(firestore, 'Candidatura');
//       const q = query(candidaturaRef, where('Id_Vaga', '==', vagaId));

//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const candidatosData: User[] = [];
//         for (const docSnap of querySnapshot.docs) {
//           const candidatura = docSnap.data();
//           const userRef = doc(firestore, 'Usuário', candidatura.Id_Usuario);
//           const userDoc = await getDoc(userRef);

//           if (userDoc.exists()) {
//             const userData = userDoc.data() || {};
//             candidatosData.push({
//               id: candidatura.Id_Usuario,
//               nome: userData?.nome || 'Nome não disponível',
//               area_atuacao: userData?.area_atuacao || '',
//               profileImageUrl: userData?.profileImageUrl,
//               bannerImageUrl: userData?.bannerImageUrl,
//               resumo: userData?.resumo || 'Resumo indisponível',
//             });
//           }
//         }
//         setCandidatos(candidatosData);
//       } else {
//         setError('Nenhum candidato encontrado para esta vaga.');
//       }
//     } catch (err) {
//       setError('Erro ao carregar os candidatos.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCandidatos();
//   }, [vagaId]);

//   const handleCardPress = (userId: string) => {
//     AsyncStorage.setItem('IdUsuario', userId)
//       .then(() => {
//         router.push(`/profileUser?userId=${userId}&vagaId=${vagaId}`);
//       })
//       .catch((error) => console.error('Erro ao salvar no AsyncStorage:', error));
//   };

//   return (
//     <View style={styles.container}>

//         <View style={styles.headerText}>
//       <Text style={styles.headerText}>Candidato salvos</Text>
//       <Text style={styles.nome2}>{titulo}</Text>
//         </View>

//       {isLoading ? (
//         <ActivityIndicator size="large" color="#fff" />
//       ) : error ? (
//         <View style={{ alignItems: "center"}}>

//         <Image style={{ width: 70, height: 70, }} source={require("../../assets/neutral2.png")}/>
//         <Text style={styles.errorText}>{error}</Text>
        
//         </View>
//       ) : (
//         <FlatList
//           data={candidatos}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.id)}>
//               <Image 
//                 source={item.bannerImageUrl ? { uri: item.bannerImageUrl } : require('../../assets/banner.png')} 
//                 style={styles.coverImage} 
//               />
//               <Image 
//                 source={item.profileImageUrl ? { uri: item.profileImageUrl } : require('../../assets/user.png')} 
//                 style={styles.profileImage} 
//               />
//               <Text style={styles.nome}>{item.nome}</Text>
//               <Text style={styles.email}>{item.area_atuacao}</Text>
//             </TouchableOpacity>
//           )}
//           numColumns={2}
//           contentContainerStyle={styles.list}
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     paddingHorizontal: 10,
//     alignItems: "center"
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 5,
//     textAlign: 'center',
//     top: 18,
//     position: 'relative'
//   },

//   card: {
//     width: 170,
//     backgroundColor: '#8400ff',
//     borderRadius: 10,
//     margin: 5,
//     overflow: 'hidden',
//     height: 200,
//   },
//   coverImage: {
//     width: '100%',
//     height: 100,
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 1,
//     borderColor: '#8400ff',
//     position: 'absolute',
//     top: 20,
//     left: '33%',
//   },
//   nome: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//     textAlign: 'center',
//     color: '#fff',
//   },
//   nome2: {
//     fontSize: 15,
//     marginTop: 20,
//     margin: 45,
//     textAlign: 'center',
//     color: '#ffffffb3',
//     fontStyle: "italic"
//   },
//   email: {
//     fontSize: 12,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: '#fff',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   list: {
//     paddingBottom: 20,
//   },
// });

// export default CandidatosVaga;
