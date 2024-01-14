import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { TimeType } from './constants/TimeType';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Life Counter/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders app and checks for y axis', () => {
  render(<App />);
  const linkElement = screen.getByText(/Years/i);
  expect(linkElement).toBeInTheDocument();
});


//Week checks

test('renders app for weeks and checks x axis for weeks', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weeks/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders weeks and checks counts', () => {
  render(<App />);
  const numWeeks = screen.getAllByTestId('timeUnitBox');
  expect(numWeeks.length).toBe(52*90);
});

test('check for 52 finished weeks, 1 year after default birthday', () => {
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2000'));
  render(<App />);
  const numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(52);
});


test('check for 1300 weeks, 25 year after default birthday', () => {
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2024'));
  render(<App />);
  const numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(1300);
});

//Month checks

test('renders app for months and checks x axis for months', async () => {
  const user = userEvent.setup({delay: null});
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Month)
  });
  const linkElement = screen.getByText(/Months/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders months and checks count', async () => {
  const user = userEvent.setup({delay: null});
  render(<App />);
  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Month)
  });

  

  const numWeeks = screen.getAllByTestId('timeUnitBox');
  expect(numWeeks.length).toBe(12*90);
});

test('check for 12 finished months, 1 year after default birthday', async () => {
  const user = userEvent.setup({delay: null});
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2000'));
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Month)
  });
  
  const numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(12);
});


test('check for 274 months, 25 year after default birthday', async () => {
  const user = userEvent.setup({delay: null});
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2024'));
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Month)
  });

  const numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(25*12);
});



//Year checks

test('renders app for years and checks x axis for years', async () => {
  const user = userEvent.setup({delay: null});
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Year)
  });
  const linkElement = screen.getAllByText(/Years/i);
  expect(linkElement.length).toBeGreaterThanOrEqual(2);
});

test('renders app and checks y axis for years ', async () => {
  const user = userEvent.setup({delay: null});
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Year)
  });
  const linkElement = screen.getAllByText(/Years/i);
  expect(linkElement.length).toBeGreaterThanOrEqual(2);

});

test('renders app and checks year rowValueMultiplier', async () => {
  const user = userEvent.setup({delay: null});
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Year)
  });
  const linkElement = screen.getAllByText(/50/);
  expect(linkElement.length).toBeGreaterThan(0);

});

test('renders Year and checks count', async () => {
  const user = userEvent.setup({delay: null});
  render(<App />);
  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Year)
  });

  

  const numWeeks = screen.getAllByTestId('timeUnitBox');
  expect(numWeeks.length).toBe(10*9);
});

test('check for 1 finished year, 1 year after default birthday', async () => {
  const user = userEvent.setup({delay: null});
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2000'));
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Year)
  });
  
  const numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(1);
});


test('check for 25 years, 25 year after default birthday', async () => {
  const user = userEvent.setup({delay: null});
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2024'));
  render(<App />);

  let unitSelect = screen.getByDisplayValue(TimeType.Week);

  await act(async () => {
    user.selectOptions(unitSelect, TimeType.Year)
  });

  const numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(25);
});

// Reactive Tests
beforeEach(jest.useRealTimers);

test('Check that UI updates correctly after new birthday', async () => {
  //ts-ignore
  const user = userEvent.setup({delay: null});
  jest
  .useFakeTimers()
  .setSystemTime(new Date('03/16/2024'));


  

  render(<App />);

  let numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(1300);



  let birthdayInput = screen.getByDisplayValue('03/16/1999');
  expect(birthdayInput).toBeTruthy();
  
  
  await act(async () => {
    
    await user.clear(birthdayInput);
    await user.type(birthdayInput, "03/16/1998");
    await user.type(birthdayInput, "{enter}");
    
  });
  
  numWeeks = screen.getAllByTestId('finishedTimeUnit');
  expect(numWeeks.length).toBe(1352);



});
