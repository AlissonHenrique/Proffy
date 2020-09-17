import React, { FormEvent, useCallback, useState } from 'react';
import './styles.css';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  const searchTeachers = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const data = {
          subject,
          weekday,
          time,
        };
        const response = await api.get('classes', { params: data });
        setTeachers(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    [subject, weekday, time],
  );

  return (
    <div className="container" id="page-teacher-list">
      <PageHeader title="Esses são os Proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select
            name="week_day"
            label="Dia da Semana"
            value={weekday}
            onChange={e => {
              setWeekday(e.target.value);
            }}
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
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={e => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};
export default TeacherList;
