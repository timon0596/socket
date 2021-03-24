import {
  action, computed, makeObservable, observable,
} from 'mobx';

export default class ProfileStore {
    @observable initials = {
      name: 'null',
      surname: 'null',
      id: 'null',
    }

    constructor() {
      makeObservable(this);
    }

    @action
    setInitials({ name, id, surname }) {
      this.initials.surname = surname;
      this.initials.name = name;
      this.initials.id = id;
    }

    @computed get user() {
      return `${this.initials.name} ${this.initials.surname}`;
    }
}
