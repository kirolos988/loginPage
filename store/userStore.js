import { create } from "zustand";

const useUserStore = create((set) => ({
  userInfo: {
    id: null,
    name: null,
    email: null,
    addresses: [],
    is_influencer: false,
    organization_id: null,
    referral: null,
    roles: [],
    shop_id: null,
    status: null,
  },

  setUserInfo: (info) =>
    set({
      userInfo: {
        id: info.id || null,
        name: info.name || null,
        email: info.email || null,
        addresses: info.addresses || [],
        is_influencer: info.is_influencer || false,
        organization_id: info.organization_id || null,
        referral: info.referral || null,
        roles: info.roles || [],
        shop_id: info.shop_id || null,
        status: info.status || null,
      },
    }),

  clearUserInfo: () =>
    set({
      userInfo: {
        id: null,
        name: null,
        email: null,
        addresses: [],
        is_influencer: false,
        organization_id: null,
        referral: null,
        roles: [],
        shop_id: null,
        status: null,
      },
    }),
}));

export default useUserStore;
