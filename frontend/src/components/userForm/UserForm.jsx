import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './UserForm.css';
import { format, parse } from 'date-fns';

const BASE_URL = 'http://localhost:8080/user';

function formatDate(inputDate) {
    return format(new Date(inputDate), 'dd/MM/yyyy');
}

function formatDateForInput(inputDate) {
    const parsedDate = parse(inputDate, 'dd/MM/yyyy', new Date());
    return format(parsedDate, 'yyyy-MM-dd');
}

function UserForm({ currentUser, editMode, onUserAdded, onUserUpdated }) {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (editMode && currentUser) {
            setName(currentUser.name);
            setBirthDate(formatDateForInput(currentUser.birthDate));
        } else {
            resetForm();
        }
    }, [currentUser, editMode]);

    const resetForm = () => {
        setName('');
        setBirthDate('');
        setPhoto(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = buildFormData();
        const response = await submitData(formData);
        handleResponse(response);
    };

    const buildFormData = () => {
        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify({
            name,
            birthDate: formatDate(birthDate)
        })], { type: "application/json" }));
        if (photo) {
            formData.append('file', photo);
        }
        return formData;
    };

    const submitData = (formData) => {
        const url = `${BASE_URL}${editMode && currentUser ? `/${currentUser.code}` : ''}`;
        return fetch(url, {
            method: editMode ? 'PUT' : 'POST',
            body: formData,
        });
    };

    const handleResponse = async (response) => {
        if (response.ok) {
            editMode ? onUserUpdated() : onUserAdded();
            resetForm();
            alert(`Usuário ${editMode ? 'atualizado' : 'adicionado'} com sucesso!`);
        } else {
            alert(`Falha ao ${editMode ? 'atualizar' : 'adicionar'} usuário!`);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{editMode ? 'Editar Usuário' : 'Cadastro de Usuários'}</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <FormInput label="Nome:" type="text" value={name} onChange={setName} required />
                <FormInput label="Data de Nascimento:" type="date" value={birthDate} onChange={setBirthDate} required />
                <FormInput label="Foto:" type="file" onChange={setPhoto} required file />
                <button type="submit" className="form-button">{editMode ? 'Editar' : 'Adicionar Usuário'}</button>
            </form>
        </div>
    );
}

function FormInput({ label, type, value, onChange, required, file }) {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(file ? e.target.files[0] : e.target.value)}
                className="form-input"
                required={required}
                placeholder={`Digite o ${label.toLowerCase()}`}
            />
        </div>
    );
}

UserForm.propTypes = {
    currentUser: PropTypes.object,
    editMode: PropTypes.bool.isRequired,
    onUserAdded: PropTypes.func.isRequired,
    onUserUpdated: PropTypes.func.isRequired
};

export default UserForm;
