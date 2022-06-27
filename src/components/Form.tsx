import React, { FC, useEffect, useState } from 'react';
import s from './Form.module.scss';
import { Button, DatePicker, Form, Input, Row } from 'antd';
import { useInput } from '../hooks/useInput';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { IEvent } from '../models/IEvent';
import { InitialFormState } from '../types/form';

export interface EventFormProps {
  // onSubmit: (event: IEvent) => void;
}

const IFormItemState: InitialFormState = {
  author: '',
  email: '',
  telNumber: '',
  date: '',
  message: '',
};

export const FormItem: FC<EventFormProps> = () => {
  const [result, setResult] = useState({
    message: '',
    success: false,
    error: null,
  });

  const [event, setEvent] = useState<IEvent>(IFormItemState);
  const name = useInput('', {
    isEmpty: true,
    minLength: 7,
    maxLength: 61,
    isName: true,
  });
  const email = useInput('', { isEmpty: true, isEmailType: true });
  const tel = useInput('', { isEmpty: true, minLength: 10, isTelType: true });
  const textArea = useInput('', { isEmpty: true, minLength: 10, maxLength: 300 });
  const bithDate = useInput('', { isEmpty: true });
  const dateFormat = 'YYYY.MM.DD';
  const [form] = Form.useForm();

  async function onSubmit(values: IEvent) {
    try {
      const response = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (response.ok) {
        setResult({
          message: 'Данные отправлены',
          success: true,
          error: null,
        });
        setTimeout(() => {
          setResult({
            message: '',
            success: false,
            error: null,
          });
          window.location.reload();
          form.resetFields();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      setResult({
        message: `Данные не отправлены, произошла ошибка, статус ошибки - ${err.message}`,
        success: false,
        error: err.message,
      });
    }
  }

  const selectData = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    onSubmit(event);
  };

  return (
    <div className={s.Wrapper}>
      <h1>Форма обратной связи</h1>
      <Form form={form} className={s.Form} onFinish={submitForm}>
        <Form.Item label="Имя Фамилия" name="username">
          <Input
            type="text"
            onChange={(e) => {
              name.onChange(e);
              setEvent({ ...event, author: e.target.value });
            }}
            onBlur={name.onBlur}
            value={name.value.toUpperCase()}
            placeholder="Введите Имя и Фамилию"
          />
          {name.isDirty && name.isEmpty && (
            <div style={{ color: 'red' }}>Поле не может быть пустым</div>
          )}
          {name.isDirty && name.maxLengthError && (
            <div style={{ color: 'red' }}>Слишкои длинное Имя</div>
          )}
          {name.isDirty && name.isNameTypeError && !name.isEmpty && (
            <div style={{ color: 'red', maxWidth: '100%' }}>
              Введите имя и фамилию через пробел латинскими буквами, длина слов не мение 3 символов{' '}
            </div>
          )}
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            type="email"
            onChange={(e) => {
              email.onChange(e);
              setEvent({ ...event, email: e.target.value });
            }}
            onBlur={email.onBlur}
            value={email.value}
            placeholder="Введите email"
          />
          {email.isDirty && email.isEmpty && (
            <div style={{ color: 'red' }}>Поле не может быть пустым</div>
          )}
          {email.isDirty && !email.isEmpty && email.isEmailTypeError && (
            <div style={{ color: 'red' }}>Некорректный email</div>
          )}
        </Form.Item>
        <Form.Item name="phone" label="Номер телефона">
          <Input
            onChange={(e) => {
              tel.onChange(e);
              setEvent({ ...event, telNumber: e.target.value });
            }}
            onBlur={tel.onBlur}
            value={tel.value}
            addonBefore="+7"
            style={{ width: '100%' }}
          />
          {tel.isDirty && tel.isEmpty && (
            <div style={{ color: 'red' }}>Поле не может быть пустым</div>
          )}
          {tel.isDirty && !tel.isEmpty && tel.isTelTypeError && (
            <div style={{ color: 'red' }}>Некоретный номер, введите 10 цифр</div>
          )}
        </Form.Item>
        <Form.Item label="Дата Рождения" name="bithdate" style={{ width: '100%' }}>
          <DatePicker
            onChange={(date) => {
              selectData(date);
            }}
            format={dateFormat}
            placeholder="Выберите дату"
          />

          {bithDate.isDirty && bithDate.isEmpty && (
            <div style={{ color: 'red' }}>Поле не может быть пустым</div>
          )}
        </Form.Item>
        <Form.Item name="message" label="Сообщение">
          <Input.TextArea
            className={s.Textarea}
            onChange={(e) => {
              textArea.onChange(e);
              setEvent({ ...event, message: e.target.value });
            }}
            onBlur={textArea.onBlur}
            value={textArea.value}
            cols={25}
            rows={5}
            placeholder="Введите сообщение"
          />
          {textArea.isDirty && textArea.isEmpty && (
            <div style={{ color: 'red' }}>Поле не может быть пустым</div>
          )}
          {textArea.isDirty && !textArea.isEmpty && textArea.minLengthError && (
            <div style={{ color: 'red' }}>
              Сообщение слишком короткое, минимальная длина сообщения 10 символов
            </div>
          )}
          {textArea.isDirty && !textArea.isEmpty && textArea.maxLengthError && (
            <div style={{ color: 'red' }}>Сообщение слишком длинное</div>
          )}
        </Form.Item>
        <Row justify="end">
          <Form.Item>
            <Button
              disabled={
                !name.inputValid ||
                result.success ||
                !email.inputValid ||
                !tel.inputValid ||
                !textArea.inputValid
              }
              type="primary"
              htmlType="submit"
            >
              Отправить
            </Button>
          </Form.Item>
        </Row>

        {result.success ? (
          <div className={s.MessageSuccess}>{result.message}</div>
        ) : (
          <div className={s.MessageError}>{result.message}</div>
        )}
      </Form>
    </div>
  );
};

export default FormItem;
