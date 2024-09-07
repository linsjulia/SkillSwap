import { CardNotification, TitleNotifications } from "@/src/components/notifications/notificationsComponents";
import { View, Text } from "react-native";
import { ScrollView } from "react-native";

export default function Notifications(){
  return (
    <ScrollView className="h-full bg-neutral-900">
    <TitleNotifications/>
    <CardNotification nameEnterprise="Tata Solucao:" content="Dispensou seu curriculo" date="20 minutos atras"/>
    <CardNotification nameEnterprise="Net Solucao:" content="Passou no processo seletivo" date="50 minutos atras"/>
    <CardNotification nameEnterprise="Microsoft:" content="Curriculo visualizado" date="2 horas atras"/>
    <CardNotification nameEnterprise="Amazon:" content="Mandou uma mensagem" date="5 horas atras"/>
    <CardNotification nameEnterprise="Mojang:" content="Visualizou seu perfil" date="20 horas atras"/>
    <CardNotification nameEnterprise="Rockstar:" content="Quer marcar uma entrevista" date="2 dias atras"/>
    </ScrollView>
  )


}