import { action, makeObservable, observable } from 'mobx';

export default class ProfileStore {
    @observable initials = {
      name: 'null',
      id: 'null',
    }

    constructor() {
      makeObservable(this);
    }

    @action
    setInitials({ name, id }) {
      this.initials.name = name;
      this.initials.id = id;
    }
}
