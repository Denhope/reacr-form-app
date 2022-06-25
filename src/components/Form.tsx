import React, { FC } from 'react';
import s from './Form.module.scss';
import { Button, DatePicker, Form, Input } from 'antd';
import { useInput } from '../hooks/useInput';

export const FormItem: FC = () => {
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

  return (
    <div className={s.Wrapper}>
      <h1>Форма обратной связи</h1>
      <Form>
        <Form.Item label="Имя Фамилия" name="username">
          <Input
            type="text"
            onChange={name.onChange}
            onBlur={name.onBlur}
            value={name.value}
            placeholder="Введите Имя и Фамилию"
          />
          {name.isDirty && name.isEmpty && (
            <div style={{ color: 'red' }}>Поле не может быть пустым</div>
          )}
          {name.isDirty && name.maxLengthError && (
            <div style={{ color: 'red' }}>Слишкои длинное Имя</div>
          )}
          {name.isDirty && name.minLengthError && !name.isEmpty && (
            <div style={{ color: 'red' }}>Слишком коротко</div>
          )}
          {name.isDirty && name.valueTypeError && !name.isEmpty && (
            <div style={{ color: 'red' }}>Некоретный ввод</div>
          )}
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            type="email"
            onChange={email.onChange}
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
            onChange={tel.onChange}
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
        <Form.Item label="Дата Рождения" style={{ width: '100%' }}>
          <DatePicker />

          {bithDate.isDirty && bithDate.isEmpty && (
            <div style={{ color: 'red' }}>Поле не может быть пустым</div>
          )}
        </Form.Item>
        <Form.Item name="message" label="Сообщение">
          <Input.TextArea
            className={s.Textarea}
            onChange={textArea.onChange}
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
            <div style={{ color: 'red' }}>Сообщение слишком короткое</div>
          )}
          {textArea.isDirty && !textArea.isEmpty && textArea.maxLengthError && (
            <div style={{ color: 'red' }}>Сообщение слишком длинное</div>
          )}
        </Form.Item>
        <Button
          disabled={
            !email.inputValid || !tel.inputValid || !textArea.inputValid || !bithDate.inputValid
          }
          type="primary"
          htmlType="submit"
        >
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default FormItem;
