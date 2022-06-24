import React, { FC, useEffect, useState } from 'react';
import s from './App.module.scss';
import FormItem from '../src/components/Form';

export const App: FC = () => {
  return (
    <div className={s.App}>
      <div className={s.AppWrapper}>
        <FormItem />
      </div>
    </div>
  );
};

export default App;
