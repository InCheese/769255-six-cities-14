import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { TOffer } from './offer';
import { TOfferPreview } from './offer-preview';
import { TNewReview, TReview } from './review';
import { TUserData } from './user-data';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TUserProcess = TUserData&{
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

export type TMainData = {
  activeCity: string;
  offers: TOfferPreview[];
  isLoading: boolean;
  hasError: boolean;
};

export type TOfferData = {
  data: TOffer | null;
  isLoading: boolean;
  offerId: string;
};

export type TOffersNearByData = {
  data: TOfferPreview[];
  isLoading: boolean;
};

export type TReviewData = {
  reviews: {
    data: TReview[];
    isLoading: boolean;
  };
  newReview: {
    data: TNewReview | null;
    isLoading: boolean;
  };
};

export type TFavoriteData = {
  offers: TOfferPreview[];
  isLoading: boolean;
};
