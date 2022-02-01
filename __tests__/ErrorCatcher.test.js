import { render, screen } from '@testing-library/react';
import ErrorCatcher from '../components/ErrorCatcher';
import ContextProvider from '../context/context'


describe('<ErrorCatcher/>', () => {
    it('renders Error catcher when provided props are passed', () => {

    const mockCallback = ()=>{
        alert('executed')
    }
      const { container, debug } = render(
        <ContextProvider contextData={{}}>
            <ErrorCatcher message="Error Occured" callback={mockCallback}/>
        </ContextProvider>

      );

      const msg = screen.getByText('Error Occured')
      expect(msg).toBeInTheDocument();
    });
    
  });
  