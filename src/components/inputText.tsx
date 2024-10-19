import { Feather } from "@expo/vector-icons";
import { TextInput, View, Text } from "react-native";
import { useForm, Controller } from 'react-hook-form';

export interface RequisitosCampoDeTexto {
  placeholder: string; 
}

export function InputsText({ placeholder }: RequisitosCampoDeTexto) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholderTextColor="white"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className="border border-indigo-600 text-white w-96 rounded-full h-14 text-left px-6 my-4"
            style={{
              fontFamily: "Inter",
              fontWeight: "700",
              letterSpacing: 1.3,
              shadowColor: "cyan",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
            }}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={{ color: 'red' }}>Isso é obrigatório</Text>}

      <Controller
        control={control}
        name="lastName"
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholderTextColor="white"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className="border border-indigo-600 text-white w-96 rounded-full h-14 text-left px-6 my-4"
            style={{
              fontFamily: "Inter",
              fontWeight: "700",
              letterSpacing: 1.3,
              shadowColor: "cyan",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
            }}
          />
        )}
      />
      {errors.lastName && <Text style={{ color: 'red' }}>Máximo de 100 caracteres</Text>}
    </View>
  );
}

export function InputsPassword({ placeholder }: RequisitosCampoDeTexto) {
  return (
    <View>
      <TextInput
        secureTextEntry
        placeholderTextColor="white"
        placeholder={placeholder}
        className="border border-indigo-600 text-white w-96 rounded-full h-14 text-left px-6 my-4"
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1.3,
          shadowColor: "cyan",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        }}
      />
    </View>
  );
}
