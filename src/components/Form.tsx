import React, { FC, useEffect, useState } from 'react';
import s from './Form.module.scss';
import { Button, DatePicker, Form, Input } from 'antd';

export const FormItem: FC = () => {
  return (
    <div className={s.Wrapper}>
      <h1>Форма обратной связи</h1>
      <Form>
        <Form.Item label="Имя Фамилия" name="username">
          <Input placeholder="Введите Имя и Фамилию" />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email">
          <Input placeholder="Введите email" />
        </Form.Item>
        <Form.Item name="phone" label="Номер телефона">
          <Input addonBefore="+7" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Дата Рождения" style={{ width: '100%' }}>
          <DatePicker placeholder="Выберите дату" />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Сообщение">
          <Input.TextArea
            className={s.Textarea}
            cols={25}
            rows={5}
            placeholder="Введите сообщение"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default FormItem;
