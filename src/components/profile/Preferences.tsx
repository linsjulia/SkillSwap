import {  View } from "react-native";
import { Title } from "./Title";
import { Option } from "./Option";
import { Switch } from "./Switch";
import { useState } from "react";
import { Checkbox } from "../Checkbox";

export function Preferences(){
  const [isEnabled,setIsEnabled] = useState(false);
  return(
    <View className="w-full">
      <Title>Preferecias</Title>
      <Option>
        <Option.Icons icon="dark-mode"/>
        <Option.Title>Receber Notificacao</Option.Title>
        <Switch onValueChange={setIsEnabled} value={isEnabled}/>
      </Option>
      <Option>
        <Option.Icons icon="email"/>
        <Option.Title>Email publico</Option.Title>
        <Checkbox/>
      </Option>
    </View>
  )
}