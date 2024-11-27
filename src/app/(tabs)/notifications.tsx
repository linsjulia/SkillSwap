import React, { useState, useEffect } from "react"; 
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native"; 
import { db, doc, onSnapshot, arrayUnion, Timestamp, setDoc, collection, getDoc, query, where } from '../../../firebaseConfig'; 
import { getAuth, onAuthStateChanged, User } from "firebase/auth"; 
import { TitleNotifications } from "@/src/components/user/notifications/notificationsComponents"; 

interface Notification {
  mensagem: string;
  data: Timestamp;
  lida: boolean;
}

interface NotificationProps {
  nameEnterprise: string;
  content: string;
  date: string;
  onMarkAsRead: () => void;
}

const CardNotification: React.FC<NotificationProps> = ({ nameEnterprise, content, date, onMarkAsRead }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{nameEnterprise}</Text>
      <Text style={styles.cardText}>{content}</Text>
      
      <View style={styles.dateContainer}>
        <Text style={styles.cardText}>{date}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: date === "Lida" ? '#444' : '#6a00ff' }]} 
        onPress={onMarkAsRead}
        disabled={date === "Lida"} 
      >
        <Text style={styles.buttonText}>Marcar como lida</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Você precisa estar logado para acessar as notificações.");
        window.location.href = "../login.html";
        return;
      }

      setUser(user);
      carregarNotificacoes(user.uid);
      monitorarCandidaturas(user.uid);
    });
  }, []);

  async function carregarNotificacoes(userId: string) {
    const notificacoesRef = doc(db, "Notificacoes", userId);

    onSnapshot(notificacoesRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const notificacoes = data.notificacoes || [];
        setNotifications(notificacoes); 
        setNotifications([]);
      }
    });
  }

  async function monitorarCandidaturas(userId: string) {
    const candidaturaRef = collection(db, "Candidatura");
    const q = query(candidaturaRef, where("Id_Usuario", "==", userId));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((docSnapshot) => {
        const candidaturaData = docSnapshot.data();
        const status = candidaturaData.status;
        const vagaId = candidaturaData.Id_Vaga;

        if (status === "Aceito") {
          adicionarNotificacao(userId, vagaId);
        }
      });
    });
  }

  async function adicionarNotificacao(usuarioId: string, vagaId: string) {
    try {
      const vagaRef = doc(db, "Vagas", vagaId);
      const vagaDoc = await getDoc(vagaRef);

      if (vagaDoc.exists()) {
        const vagaData = vagaDoc.data();
        const empresaId = vagaData.EmpresaID;

        if (!empresaId) {
          throw new Error("EmpresaID não encontrado.");
        }

        const empresaRef = doc(db, "Empresa", empresaId);
        const empresaDoc = await getDoc(empresaRef);

        if (empresaDoc.exists()) {
          const empresaNome = empresaDoc.data().nome;

          if (!empresaNome) {
            throw new Error("Nome da empresa não encontrado.");
          }

          const notificacoesRef = doc(db, "Notificacoes", usuarioId);
          await setDoc(notificacoesRef, {
            notificacoes: arrayUnion({
              mensagem: `Sua candidatura para a vaga foi aceita pela empresa ${empresaNome}!`,
              data: Timestamp.now(),
              lida: false
            })
          }, { merge: true });

          console.log("Notificação enviada com sucesso!");
        } else {
          throw new Error("Empresa não encontrada com o ID fornecido.");
        }
      } else {
        throw new Error("Vaga não encontrada.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao adicionar notificação:", error.message);
        alert(`Erro: ${error.message}`);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  }

  async function marcarNotificacaoComoLida(notificationIndex: number) {
    if (!user) return;

    const usuarioId = user.uid;
    const notificacoesRef = doc(db, "Notificacoes", usuarioId);
    const notificacoesDoc = await getDoc(notificacoesRef);

    if (notificacoesDoc.exists()) {
      const notifications = notificacoesDoc.data().notificacoes;
      const notification = notifications[notificationIndex];
      notification.lida = true;

      await setDoc(notificacoesRef, {
        notificacoes: notifications
      }, { merge: true });

      const updatedNotifications = [...notifications];
      updatedNotifications[notificationIndex] = { ...notification, lida: true };
      setNotifications(updatedNotifications);

      console.log("Notificação marcada como lida.");
    }
  }

  async function marcarTodasComoLidas() {
    if (!user) return;

    const usuarioId = user.uid;
    const notificacoesRef = doc(db, "Notificacoes", usuarioId);
    const notificacoesDoc = await getDoc(notificacoesRef);

    if (notificacoesDoc.exists()) {
      const notifications = notificacoesDoc.data().notificacoes;
      const updatedNotifications = notifications.map((notification: any) => ({
        ...notification,
        lida: true
      }));

      await setDoc(notificacoesRef, {
        notificacoes: updatedNotifications
      }, { merge: true });

      setNotifications(updatedNotifications);

      console.log("Todas as notificações foram marcadas como lidas.");
    }
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.titleContainer}>
        <TitleNotifications />
      </View>

      <TouchableOpacity onPress={marcarTodasComoLidas}>
        <Text style={styles.markAllButtonText}>Marcar todas como lidas</Text>
      </TouchableOpacity>

      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <CardNotification
            key={index}
            nameEnterprise={notification.mensagem}
            content={`Data: ${new Date(notification.data.seconds * 1000).toLocaleString("pt-BR")}`}
            date={notification.lida ? "Lida" : new Date(notification.data.seconds * 1000).toLocaleString("pt-BR")}
            onMarkAsRead={() => marcarNotificacaoComoLida(index)}
          />
        ))
      ) : (
        <Text style={styles.NotificationsText}>Nenhuma notificação encontrada.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
  },

  NotificationsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },

  titleContainer: {
    top: -10,
    alignItems: 'center',
    marginBottom: 20,
  },

  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(111, 111, 111, 0.4)',
    borderRadius: 8,
    borderColor: '#6a00ff',
    borderWidth: 2,
  },

  cardText: {
    color: '#fff',
  },

  button: {
    paddingVertical: 5, 
    paddingHorizontal: 12, 
    borderRadius: 20,
    marginTop: 1,
    alignSelf: 'flex-end', 
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
  },

  markAllButtonText: {
    top: -10,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',  
  },
});
