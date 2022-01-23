import { makeAutoObservable } from 'mobx';
import { check } from '../API/UserAPI';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._wishList = { list: [] };
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setWishList(items) {
    this._wishList.list = items;
  }

  addToWishList(item) {
    this._wishList.list.push(item);
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get wishList() {
    return this._wishList;
  }

  removeFromWishList(item) {
    if (!Array.isArray(this.wishList.list)) {
      this._wishList.list = [];
    }
    const itemIndex = this.wishList.list.indexOf(item);
    this.wishList.list.splice(itemIndex, 1);
  }

  async checkAuth() {
    const data = await check();
    localStorage.setItem('token', data.message.accessToken);
    this.setIsAuth(true);
    this.setUser(data.message.user);
  }
}
