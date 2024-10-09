import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AddOn {
  id: string;
  label: string;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

export interface Subscription {
  selectedPlan: string;
  addOns: AddOn[];
  cardDetails: CardDetails;
}

export interface SubscriptionState {
  data: Subscription | null;
  loading: boolean;
  error: string | null;
}

export const initialState: SubscriptionState = {
  data: null,
  loading: false,
  error: null,
};

const subscription = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    fetchSubscriptionStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchSubscriptionSuccess: (state, action: PayloadAction<Subscription>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchSubscriptionFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateSubscriptionStart: (state, action: PayloadAction<Subscription>) => {
      state.loading = true;
      state.error = null;
    },
    updateSubscriptionSuccess: (state, action: PayloadAction<Subscription>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateSubscriptionFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSubscriptionStart,
  fetchSubscriptionSuccess,
  fetchSubscriptionFailure,
  updateSubscriptionStart,
  updateSubscriptionSuccess,
  updateSubscriptionFailure,
} = subscription.actions;

export default subscription.reducer;
