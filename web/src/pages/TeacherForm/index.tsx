import React, { FormEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [schenduleItems, setSchenduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);
  const history = useHistory();

  const addNewSchenduleItem = useCallback(() => {
    setSchenduleItems([
      ...schenduleItems,
      { week_day: Math.random(), from: '', to: '' },
    ]);
  }, [schenduleItems]);

  const handleCreateClass = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const data = {
          name,
          avatar,
          bio,
          whatsapp,
          subject,
          cost: Number(cost),
          schendule: schenduleItems,
        };
        await api.post('classes', data);
        history.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    [name, avatar, bio, whatsapp, subject, cost, schenduleItems],
  );
  const setScheduleItemValue = useCallback(
    (position: number, field: string, value: string) => {
      const updateScheduleItem = schenduleItems.map((schenduleItem, index) => {
        if (index === position) {
          return { ...schenduleItem, [field]: value };
        }
        return schenduleItem;
      });
      setSchenduleItems(updateScheduleItem);
    },
    [schenduleItems],
  );

  return (
    <div className="container" id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulario de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={e => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={e => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
              }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Matematica', label: 'Matematica' },
                { value: 'Ingles', label: 'Ingles' },
                { value: 'Historia', label: 'Historia' },
                { value: 'Fisica', label: 'Fisica' },
                { value: 'Portugues', label: 'Portugues' },
                { value: 'Quimica', label: 'Quimica' },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={e => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponiveis
              <button type="button" onClick={addNewSchenduleItem}>
                + Novo Horario
              </button>
            </legend>
            {schenduleItems.map((schenduleItem, index) => {
              return (
                <div key={schenduleItem.week_day} className="schedule-item">
                  <Select
                    name="week day"
                    label="Dia da Semana"
                    onChange={e => {
                      setScheduleItemValue(index, 'week day', e.target.value);
                    }}
                    value={schenduleItem.week_day}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda' },
                      { value: '2', label: 'Terça' },
                      { value: '3', label: 'Quarta' },
                      { value: '4', label: 'Quinta' },
                      { value: '5', label: 'Sexta' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={schenduleItem.from}
                    onChange={e => {
                      setScheduleItemValue(index, 'from', e.target.value);
                    }}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={schenduleItem.to}
                    onChange={e => {
                      setScheduleItemValue(index, 'to', e.target.value);
                    }}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};
export default TeacherForm;
