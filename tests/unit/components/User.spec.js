import { shallowMount, createLocalVue } from '@vue/test-utils';
import { convertUTCDate } from '@/filters/string-formating';
import User from '@/components/User';

const localVue = createLocalVue();

localVue.filter('convertUTCDate', convertUTCDate);

describe('User.vue', () => {
  let stubbedComponents;
  let userInfo;

  beforeEach(() => {
    stubbedComponents = ['b-checkbox', 'b-field', 'b-switch', 'font-awesome-icon'];

    userInfo = {
      _id: '123',
      activated: true,
      created: '',
      firstname: '',
      lastname: '',
      company: '',
      email: '',
      addresses: [{ country: 'US' }],
    };
  });

  it('changeActive() - changes active status of user', async () => {
    // Arrange
    const wrapper = shallowMount(User, {
      stubs: stubbedComponents,
      propsData: {
        selectedUser: -1,
        index: 0,
        userInfo,
      },
      data() {
        return {
        };
      },
      localVue,
    });

    // Act
    await wrapper.vm.changeActive(true);

    // Assert
    expect(wrapper.emitted('user-activation')).toBeTruthy();
    expect(wrapper.emitted('user-activation')[0][0].data.activated).toEqual(true);
    expect(wrapper.emitted('user-activation')[0][0].isUpdate).toEqual(true);
    expect(wrapper.emitted('user-activation')[0][0].id).toEqual(wrapper.vm.userInfo._id);
  });

  it('sendUserSelectedEvent() - sends selected status event', async () => {
    // Arrange
    const wrapper = shallowMount(User, {
      stubs: stubbedComponents,
      propsData: {
        selectedUser: -1,
        index: 0,
        userInfo,
      },
      data() {
        return {
        };
      },
      localVue,
    });

    // Act
    await wrapper.vm.sendUserSelectedEvent(true);

    // Assert
    expect(wrapper.emitted('user-selected')).toBeTruthy();
    expect(wrapper.emitted('user-selected')[0][0].checked).toEqual(true);
    expect(wrapper.emitted('user-selected')[0][0].index).toEqual(0);
  });

  it('isSelectedNotMatching() - retains default checkbox state', async () => {
    // Arrange
    const wrapper = shallowMount(User, {
      stubs: stubbedComponents,
      propsData: {
        selectedUser: -1,
        index: 0,
        userInfo,
      },
      data() {
        return {
        };
      },
      localVue,
    });

    // Assert
    expect(wrapper.vm.isSelectedNotMatching).toEqual(false);
  });

  it('isSelectedNotMatching() - allows checkbox to remain enabled', async () => {
    // Arrange
    const wrapper = shallowMount(User, {
      stubs: stubbedComponents,
      propsData: {
        selectedUser: 0,
        index: 0,
        userInfo,
      },
      data() {
        return {
        };
      },
      localVue,
    });

    // Assert
    expect(wrapper.vm.isSelectedNotMatching).toEqual(false);
  });

  it('isSelectedNotMatching() - disables checkbox', async () => {
    // Arrange
    const wrapper = shallowMount(User, {
      stubs: stubbedComponents,
      propsData: {
        selectedUser: 0,
        index: 1,
        userInfo,
      },
      data() {
        return {
        };
      },
      localVue,
    });

    // Assert
    expect(wrapper.vm.isSelectedNotMatching).toEqual(true);
  });
});
