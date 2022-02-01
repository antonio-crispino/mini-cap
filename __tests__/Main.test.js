import { render, screen, queryByAttribute } from '@testing-library/react';
import Main from '../pages/main'
import ContextProvider from '../context/context'

//integration test, sees how main page reacts with ErrorCatcher component, context and Main component

describe('<Main/>', () => {
    it('Displays Error catcher and Asks user to login when no user found in context', () => {

      const { container, debug } = render(
        <ContextProvider contextData={{}}>
            <Main />
        </ContextProvider>

      );

      const msg = screen.getByText('You need to login to view this page')
      expect(msg).toBeInTheDocument();

    });

    it('Displays User name when user found in context', () => {

        const { container, debug } = render(
          <ContextProvider contextData={{isLoading: false, user:{firstname: 'john', lastname:'doe'}}}>
              <Main />
          </ContextProvider>
  
        );
  
        debug()
        const msg = screen.getByText('Hello john doe')
        expect(msg).toBeInTheDocument();
  
      });
    
  });
  