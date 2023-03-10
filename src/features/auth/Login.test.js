import * as React from 'react';
import {Login} from './Login'
import { render, fireEvent } from '@testing-library/react';

const mockUseNavigate = jest.fn();
const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn();


jest.mock('react-router-dom', () => ({   
    useNavigate: () => mockUseNavigate,
  }));
  jest.mock('react-redux', () => ({
      useDispatch: ()=> mockUseDispatch, 
      useSelector: ()=> mockUseSelector
  }))


   mockUseSelector.mockReturnValue({
     auth:{authUser:''},
     users:{
        johndoe: {
            password:'123',
            name: 'John Doe'
        }
     }
   })

//  mockUseDispatch.mockReturnValue({
//      johndoe: {
//          password:'123',
//          name: 'John Doe'
//      }
//  })

describe('Login', () => {
    it('Submit button not disabled if name and PW are provided', ()=> {

        const component = render(<Login />)
        const loginName = component.queryByTestId('loginName')
        const loginPW = component.queryByTestId('loginPW');
        const submitBtn = component.queryByTestId('submitBtn')


        fireEvent.change(loginName, {target: {value:'Jane Doe'}});
        fireEvent.change(loginPW, {target: {value:'123'}});

        fireEvent.click(submitBtn);

        expect(submitBtn).not.toBeDisabled();
    })

})