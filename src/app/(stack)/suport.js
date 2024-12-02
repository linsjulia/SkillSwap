import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'; // Certifique-se de que o StyleSheet está importado aqui

const ChatApp = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const sendMessage = () => {
    if (userMessage.trim()) {
      addMessageToChat(userMessage, 'sent');
      setUserMessage('');

      const botResponse = getBotResponse(userMessage);
      setTimeout(() => {
        addMessageToChat(botResponse.message, 'received');
        if (botResponse.options) {
          showOptions(botResponse.options); // Mostrar opções de perguntas
        }
      }, 500); // Delay para simular resposta
    }
  };

  const addMessageToChat = (message, sender) => {
    setMessages((prevMessages) => [...prevMessages, { message, sender }]);
  };

  const showOptions = (options) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: options, sender: 'options' },
    ]);
  };

  const handleOptionClick = (optionText) => {
    addMessageToChat(optionText, 'sent');
    const botResponse = getBotResponse(optionText);
    setTimeout(() => {
      addMessageToChat(botResponse.message, 'received');
      if (botResponse.options) {
        showOptions(botResponse.options);
      }
    }, 500);
  };

  const getBotResponse = (message) => {
    message = message.toLowerCase();

    if (message.includes('olá') || message.includes('oi')) {
      return {
        message: 'Olá! Como posso te ajudar hoje?',
        options: [
          { text: 'Como cadastro meu currículo?' },
          { text: 'Como faço para me candidatar a uma vaga?' },
          { text: 'Posso me candidatar a várias vagas ao mesmo tempo?' },
          { text: 'Posso ver a descrição completa da vaga antes de me inscrever?' },
          { text: 'Como posso acompanhar o status da minha candidatura?' },
          { text: 'O que fazer se encontrar um erro no app?' },
        ],
      };
    } else if (message.includes('Como cadastro meu currículo?')) {
      return { message: 'Você pode cadastrar seu currículo no momento em que for se candidatar a vaga, e sempre que quiser atualizar é só fazer o mesmo processo de cadastro. Caso queiar apenas visualizar você pode velo no seu perfil.  ' };
    } else if (message.includes('hora')) {
      const now = new Date();
      return { message: `Agora são ${now.getHours()}:${now.getMinutes()}` };
    } else if (message.includes('ajuda')) {
      return { 
        message: 'Em que mais posso ajudar?',
        options: [
          { text: 'Fazer outra pergunta' },
          { text: 'Encerrar chat' }
        ]
      };
    } else if (message.includes('adeus') || message.includes('tchau')) {
      return { message: 'Até logo! Estou aqui sempre que precisar.' };
    } else {
      return { message: 'Desculpe, ainda estou aprendendo e não entendi sua pergunta. Tente perguntar outra coisa!' };
    }
  };

  const handleExitChat = () => {
    navigation.goBack(); // Retorna para a página anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }}
          style={styles.logo}
        />
        <Text style={styles.name}>Sky</Text>
      </View>

      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[styles.message, msg.sender === 'sent' ? styles.sent : styles.received]}
          >
            {msg.sender === 'options' ? (
              <View>
                {Array.isArray(msg.message) ? (
                  msg.message.map((opt, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionButton}
                      onPress={() => {
                        if (opt.text === 'Encerrar chat') {
                          handleExitChat(); // Se o usuário clicar em "Encerrar chat", vai voltar à página anterior
                        } else {
                          handleOptionClick(opt.text); // Caso contrário, continua o fluxo normal
                        }
                      }}
                    >
                      <Text style={styles.optionButtonText}>{opt.text}</Text>
                    </TouchableOpacity>
                  ))
                ) : null}
              </View>
            ) : (
              <Text style={[styles.messageText, msg.sender === 'sent' ? styles.sentText : styles.receivedText]}>
                {msg.message}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'flex-start',
    paddingTop: 50,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingLeft: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 24,
    color: '#f0f8ff',
    fontWeight: '300',
    marginLeft: 10,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'column',
    paddingBottom: 10, // Ajustar o padding para melhorar a rolagem
  },
  message: {
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que o texto quebre em várias linhas
    alignItems: 'flex-start',
    maxWidth: '80%', // Limita a largura da mensagem para 80% da tela
  },
  sent: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  received: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageText: {
    padding: 15,
    fontSize: 15,
    color: '#f0f8ff',
    backgroundColor: '#636363',
    borderRadius: 15,
    marginBottom: 5,
    maxWidth: '100%', // Limita a largura para que o texto não ultrapasse
    lineHeight: 1.5,
    flexWrap: 'wrap', // Quebra o texto para várias linhas
    flexShrink: 1, // Garante que a mensagem não extrapole o espaço
    minHeight: 40, // Garante uma altura mínima para o balão de mensagem
  },
  sentText: {
    backgroundColor: '#a65de2',
    alignSelf: 'flex-end',
  },
  receivedText: {
    backgroundColor: '#636363',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 15,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#333',
    color: '#f0f8ff',
  },
  sendButton: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: '#9a6ccf',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  optionButton: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#444',
    color: '#f0f8ff',
    borderRadius: 15,
    fontSize: 16,
    marginTop: 5,
  },
  optionButtonText: {
    color: '#f0f8ff',
    textAlign: 'center',
    fontSize: 16,
  },
});


export default ChatApp;
