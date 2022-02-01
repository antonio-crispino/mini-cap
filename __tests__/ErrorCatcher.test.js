import { render, screen } from '@testing-library/react';
import ErrorCatcher from '../components/ErrorCatcher';
import ContextProvider from '../context/context'


//unit test showing how Error catcher component reacts correctly to both props and context change

describe('<ErrorCatcher/>', () => {
  it('renders Error catcher when provided props are passed', () => {

    const mockCallback = () => {
      alert('executed')
    }
    const { container, debug } = render(
      <ContextProvider contextData={{}}>
        <ErrorCatcher message="Error Occured" callback={mockCallback} />
      </ContextProvider>

    );
    const msg = screen.getByText('Error Occured')
    expect(msg).toBeInTheDocument();
  });


  it('renders Error catcher when there is an error in the context', () => {

    const mockCallback = () => {
      alert('executed')
    }
    const { container, debug } = render(
      <ContextProvider contextData={{ error: { message: 'test error occured' } }}>
        <ErrorCatcher />
      </ContextProvider>

    );
    const msg = screen.getByText('test error occured')
    expect(msg).toBeInTheDocument();
  });


});
