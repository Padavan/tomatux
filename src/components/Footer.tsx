import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from 'src/store';

export const Footer = () => {
  const timer = useSelector((state: RootState) => state.timer, shallowEqual);
  return (
    <footer>
      footer
    </footer>
  );
}