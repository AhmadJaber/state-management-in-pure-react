import name from 'random-name';
import { v4 as id } from 'uuid';

export const defaultGrudges = {
  [id()]: {
    id: id(),
    person: name.first(),
    reason: 'Parked too close to me in the parking lot',
    forgiven: false
  },
  [id()]: {
    id: id(),
    person: name.first(),
    reason: 'Did not brew another pot of coffee after drinking the last cup',
    forgiven: false
  }
};
