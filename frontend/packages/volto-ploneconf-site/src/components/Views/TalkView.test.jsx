import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import TalkView from './TalkView';
const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

test('renders a talk view component with only required props', () => {
  const { container } = render(
    <Provider store={store}>
      <TalkView
        content={{
          title: 'Security of Plone',
          description: 'What makes Plone secure?',
          type_of_talk: { title: 'Talk', token: 'talk' },
          details: {
            'content-type': 'text/html',
            data: '<p>some details about this <strong>talk</strong>.</p>',
            encoding: 'utf8',
          },
        }}
      />
    </Provider>,
  );
  expect(container).toMatchSnapshot();
});
