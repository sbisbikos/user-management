import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import AddUpdateUser from '@/components/AddUpdateUser';

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('User.vue', () => {
  let stubbedComponents;
  let userInfo;
  let userInfoData;
  let userData;

  beforeEach(() => {
    stubbedComponents = ['b-input', 'b-button', 'b-checkbox', 'b-field', 'b-switch', 'font-awesome-icon'];

    userInfoData = {
      _id: '123',
      activated: true,
      created: '"2021-08-30T07:23:31.441Z"',
      firstname: 'steve',
      lastname: 'bisbikos',
      company: 'company',
      email: 'sbisbikos@hotmail.com',
      addresses: [{ country: 'US', postalCode: '13090' }],
    };

    userInfo = {};

    userData = {
      firstname: 'steve',
      lastname: 'bisbikos',
      username: 'sbisbikos',
      email: 'sbisbikos@hotmail.com',
      company: 'company',
      addresses: {
        country: 'US',
        postalCode: '13090',
      },
      jobTitle: 'Software Engineer',
    };
  });

  it('processUser() - creates new user data and activates user', async () => {
    // Arrange
    const wrapper = shallowMount(AddUpdateUser, {
      stubs: stubbedComponents,
      propsData: {
        userInfo,
      },
      data() {
        return {
          userData,
          initialUserData: {},
          errors: false,
        };
      },
      localVue,
    });

    // Act
    await wrapper.vm.processUser();

    // Assert
    expect(wrapper.emitted('user-changes')).toBeTruthy();
    expect(wrapper.emitted('user-changes')[0][0].data.activated).toEqual(true);
    expect(Array.isArray(wrapper.emitted('user-changes')[0][0].data.addresses)).toEqual(true);
    expect(wrapper.emitted('user-changes')[0][0].isUpdate).not.toBeTruthy();
    expect(wrapper.emitted('add-update-close')).toBeTruthy();
  });

  it('processUser() - updates existing user data', async () => {
    userInfo = userInfoData;
    // Arrange
    const wrapper = shallowMount(AddUpdateUser, {
      stubs: stubbedComponents,
      propsData: {
        userInfo,
      },
      data() {
        return {
          userData,
          initialUserData: {},
          errors: false,
        };
      },
      localVue,
    });

    // Act
    wrapper.setData({
      userData: {
        username: 'acoolerusername',
        jobTitle: 'Doctor',
      },
    });
    await wrapper.vm.processUser();

    // Assert
    expect(wrapper.emitted('user-changes')).toBeTruthy();
    expect(wrapper.emitted('user-changes')[0][0].isUpdate).toBeTruthy();
    expect(wrapper.emitted('user-changes')[0][0].id).toBe(wrapper.vm.initialUserData._id);
    expect(wrapper.emitted('add-update-close')).toBeTruthy();
    expect();
  });
});
