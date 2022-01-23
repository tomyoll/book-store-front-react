import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._domains = [];
    this._books = [];
    this._selectedDomain = {};
    this._selectedBook = {};
    this._page = 1;
    this._totalCount = 3;
    this._limit = 12;
    makeAutoObservable(this);
  }

  setDomains(domains) {
    this._domains = domains;
  }

  setBooks(books) {
    this._books = books;
  }

  setSelectedDomain(domain) {
    this._selectedDomain = domain;
  }

  setSelectedBook(book) {
    this._selectedBook = book;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  get domains() {
    return this._domains;
  }

  get books() {
    return this._books;
  }

  get selectedDomain() {
    return this._selectedDomain;
  }

  get selectedBook() {
    return this._selectedBook;
  }

  get limit() {
    return this._limit;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }
}
