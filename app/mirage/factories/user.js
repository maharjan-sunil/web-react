import { Factory } from 'miragejs';

const UserFactory = Factory.extend({
  email: 'user@example.com',
  password: 'password',
  firstName: 'First Name',
  lastName: 'last Name',
});

export default UserFactory;
