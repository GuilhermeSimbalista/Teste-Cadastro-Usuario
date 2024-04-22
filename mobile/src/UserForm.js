import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { format } from 'date-fns';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import CustomText from './components/CustomText';

const BASE_URL = 'http://YouIpv4:8080/user';

export default function UserForm({ navigation }) {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [photo, setPhoto] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setPhoto(result.uri);
        }
    };

    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('name', name); 
      formData.append('birthDate', format(birthDate, 'yyyy-MM-dd'));
  
      if (photo) {
        const response = await fetch(photo);
        const blob = await response.blob();
        formData.append('file', blob, 'photo.jpg');
      }
      try {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          body: formData
          });
          if (response.ok) {
            resetForm();
            Alert.alert('Sucesso', 'Usuário adicionado com sucesso!');
          } else {
            Alert.alert('Erro', 'Falha ao adicionar usuário');
          }
      } catch (error) {
          Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor.');
      }
  };
    const resetForm = () => {
      setName('');
      setBirthDate(new Date());
      setPhoto(null);
    };
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cadastro de Usuário</Text>
        <CustomInput 
          text={'Nome'} 
          label={'digite o nome'} 
          keyboardType={'default'}
          onChangeText={setName}
          value={name}
        />
        <CustomText
          text="Selecione sua data de nascimento"
          label="Data de nascimento"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <CustomText
              text="Selecione sua foto"
              label="Selecionar Foto"  
              onPress={pickImage} />
          {photo && <Text>Foto selecionada</Text>}
          <CustomButton label="Adicionar Usuário" onPress={handleSubmit} />
          <CustomButton label="Listar Usuarios" onPress={() => navigation.navigate("UserList")} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'start',
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20 
  }
})
