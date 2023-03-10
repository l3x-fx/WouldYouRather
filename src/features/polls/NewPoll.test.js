//snapshot
import * as React from 'react';
import {NewPoll} from './NewPoll'
import { render, fireEvent } from '@testing-library/react';

const mockUsNavigate = jest.fn();
const mockUsDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-router-dom', () => ({   
    useNavigate: () => mockUsNavigate,
  }));
  jest.mock('react-redux', () => ({
      useDispatch: ()=> mockUsDispatch, 
      useSelector: ()=> mockUseSelector
  }))

describe('NewPoll renders correctly', () => {
it('will match snapshot', ()=> {
    const component = render( <NewPoll /> )
    expect(component).toMatchSnapshot()
}
)
});

describe('test if button disabled', () => {
    it('will change to not disabled', ()=> {
        const component = render(<NewPoll />)
        const optA = component.queryByTestId('optA-input')
        const optB = component.queryByTestId('optB-input');
        const submitBtn = component.queryByTestId('submitBtn')

        fireEvent.change(optA, {target: {value:'text1'}});
        fireEvent.change(optB, {target: {value:'text2'}});

        expect(submitBtn).not.toBeDisabled();   
    })

    it('will not change to not disabled', ()=> {
        const component = render(<NewPoll />)
        const optA = component.queryByTestId('optA-input')
        const submitBtn = component.queryByTestId('submitBtn')

        fireEvent.change(optA, {target: {value:'text1'}});

        expect(submitBtn).toBeDisabled();

   
    })
})
