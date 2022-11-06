import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { route } from '../../route/route';
import { Table } from '../table/Table';
import { Info } from '../info/Info';

export const Content = (): JSX.Element => {
  return (
    <section className='main main_vertical content'>
      <Routes>
        <Route path={route.main} element={<Table />} />
        <Route path={route.about} element={<Info />} />
      </Routes>
    </section>
  );
};