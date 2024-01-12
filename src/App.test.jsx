import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/LifeCounter/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders app and checks for y axis', () => {
  render(<App />);
  const linkElement = screen.getByText(/Week/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders app and checks x axis', () => {
  render(<App />);
  const linkElement = screen.getByText(/Year/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders weeks and checks counts', () => {
  render(<App />);
  const numWeeks = screen.getAllByTestId('week');
  expect(numWeeks.length).toBe(52*90);
});

test('check for 52 finished weeks, 1 year after default birthday', () => {
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2000'));
  render(<App />);
  const numWeeks = screen.getAllByTestId('finishedWeek');
  expect(numWeeks.length).toBe(52);
});


test('check for 1300, 25 year after default birthday', () => {
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2024'));
  render(<App />);
  const numWeeks = screen.getAllByTestId('finishedWeek');
  expect(numWeeks.length).toBe(1300);
});

beforeEach(jest.useRealTimers);

test('Check that UI updates correctly after new birthday', async () => {
  //ts-ignore
  const user = userEvent.setup({delay: null});
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2024'));


  

  render(<App />);

  let numWeeks = screen.getAllByTestId('finishedWeek');
  expect(numWeeks.length).toBe(1300);



  let birthdayInput = screen.getByDisplayValue('03/16/1999');
  expect(birthdayInput).toBeTruthy();
  
  
  await act(async () => {
    
    await user.clear(birthdayInput);
    await user.type(birthdayInput, "03/16/1998");
    await user.type(birthdayInput, "{enter}");
    
  });
  
  numWeeks = screen.getAllByTestId('finishedWeek');
  expect(numWeeks.length).toBe(1352);



});
