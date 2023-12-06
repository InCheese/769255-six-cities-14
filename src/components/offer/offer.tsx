import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { HelmetTitles } from '../../const';
import { useAppDispatch } from '../../hooks';
import useOffer from '../../hooks/use-offer';
import { postFavoriteAction } from '../../store/offer/offer.api-actions';
import { TOfferPreview } from '../../types/offer-preview';
import { getLocations } from '../../utils';
import Map from '../common/map/map';
import Spinner from '../common/spinner/spinner';
import NotFound from '../not-found/not-found';
import OffersNearBy from '../offers-near-by/offers-near-by';
import Reviews from '../reviews/reviews';
import OfferImages from './offer-images/offer-images';

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();

  const offerId = useParams<string>().id;
  const { isLoading, offer, slicedOffersNearBy } = useOffer(offerId);

  if (isLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFound />;
  }
  const {
    images,
    title,
    isPremium,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    rating,
    city,
    isFavorite,
    location,
    id,
    previewImage,
  } = offer;

  const offerPreview: TOfferPreview = {
    id,
    title,
    isPremium,
    type,
    price,
    rating,
    city,
    isFavorite,
    location,
    previewImage,
  };

  const offersForMap = [...slicedOffersNearBy, offerPreview];

  const ratingStar = (Math.ceil(rating) * 20).toString();

  const handleClick = () => {
    dispatch(postFavoriteAction(Number(!isFavorite)));
  };

  return (
    <>
      <Helmet>
        <title>{HelmetTitles.Offer}</title>
      </Helmet>

      <div className="page">
        <main className="page__main page__main--offer">
          <section className="offer">
            <OfferImages images={images} />
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{title}</h1>
                  <button
                    className={
                      isFavorite
                        ? 'offer__bookmark-button offer__bookmark-button--active button'
                        : 'offer__bookmark-button button'
                    }
                    type="button"
                    onClick={handleClick}
                  >
                    <svg
                      className="offer__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${ratingStar}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {Math.round(rating)}
                  </span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults > 1 ? 'adults' : 'adult'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{host.name}</span>
                    <span className="offer__user-status">
                      {host.isPro && 'Pro'}
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{description}</p>
                  </div>
                </div>
                <Reviews />
              </div>
            </div>
            <Map
              city={city}
              points={getLocations(offersForMap)}
              activeLocation={offerPreview.location}
              className="offer__map"
            />
          </section>
          <div className="container">
            <OffersNearBy offers={slicedOffersNearBy} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Offer;
