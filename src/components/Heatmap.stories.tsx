import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';
import Heatmap from './Heatmap';
import configureStore from '../store/configureStore';

const store = configureStore();

storiesOf('Statistics', module)
  .addDecorator(story => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>{story()}</Provider>
      </MemoryRouter>
    );
  })
  .add('Heatmap', () => (
    <Heatmap />
  ));
