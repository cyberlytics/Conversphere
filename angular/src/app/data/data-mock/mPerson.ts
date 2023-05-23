// eslint-disable-next-line @typescript-eslint/no-unused-vars
class mLukas implements Person {
  forename = 'Lukas';
  surename = 'Feil';
  dateOfBirth: Date = new Date(1997, 6, 21);
  address: Address = {
    street: 'Ammermühlweg',
    houseNumber: '9',
    residence: 'Bad Kötzting',
    postalCode: '93444',
    country: 'Germany',
  };
}
