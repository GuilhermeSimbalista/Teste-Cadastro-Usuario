import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from './components/CustomButton';

const BASE_URL = 'http://YouIpv4:8080/user'; 

export default function UserList({ navigation }) {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários');
    }
  };

  const editUser = (user) => {
    setEditableUser(user);
    setModalVisible(true);
  };

  const deleteUser = async (userId) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir', onPress: async () => {
            const response = await fetch(`${BASE_URL}${userId}`, {
              method: 'DELETE',
            });

            if (response.ok) {
              const updatedUsers = users.filter(user => user.code !== userId);
              setUsers(updatedUsers);
              Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
            } else {
              Alert.alert('Erro', 'Falha ao excluir usuário');
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const updateUser = async (user) => {
    const response = await fetch(`${BASE_URL}${user.code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      setModalVisible(false);
      fetchUsers(); 
    } else {
      Alert.alert('Erro', 'Falha ao atualizar usuário');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={item => item.code.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>{item.name}</Text>
            <Button title="Editar" onPress={() => editUser(item)} />
            <Button title="Excluir" onPress={() => deleteUser(item.code)} />
          </View>
        )}
      />
            <CustomButton
        label="Voltar ao Cadastro"
        onPress={() => navigation.navigate('UserForm')}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Usuário</Text>
          <TextInput
            style={styles.input}
            value={editableUser.name}
            onChangeText={(text) => setEditableUser({ ...editableUser, name: text })}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEditableUser({...editableUser, birthDate: text})}
            value={editableUser.birthDate}
            placeholder="Data de Nascimento"
          />
          <Button title="Salvar Alterações" onPress={() => updateUser(editableUser)} />
          <Button title="Fechar" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10
  }
});
