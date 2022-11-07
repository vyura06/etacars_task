import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Table } from '../table/Table';
import { Info } from '../info/Info';

import { useEffect } from "react";
import { getCurrencies } from "../../redux/slices/currencySlice";
import { useAppDispatch } from "../../hooks/hooks";

export const Content = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  return (
    <section className='main main_vertical content'>
      <Routes>
          <Route path="/" element={<Table />} />
          <Route path="currency/:id" element={<Info />} />
      </Routes>
    </section>
  );
};

export default Content;