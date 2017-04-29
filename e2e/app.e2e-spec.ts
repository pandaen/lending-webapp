import { BorrowSysPage } from './app.po';

describe('borrow-sys App', () => {
  let page: BorrowSysPage;

  beforeEach(() => {
    page = new BorrowSysPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
