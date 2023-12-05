import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postFavoriteAction } from '../../../store/main/main.api-actions';
import { setOfferId } from '../../../store/offer/offer.slice';
import { getAuthorizationStatus } from '../../../store/user/user.selectors';
import { TOfferPreview } from '../../../types/offer-preview';

type OfferPreviewCardProps = {
  offer: TOfferPreview;
  onMouseOver: (offerId: string | null) => void;
};

function OfferPreviewCard({ offer, onMouseOver }: OfferPreviewCardProps) {
  const { id, rating, isPremium, price, title, type, isFavorite } = offer;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getAuthorizationStatus);

  const handleClickOffer = () => {
    dispatch(setOfferId(id));
  };

  const handleClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const status = Number(!isFavorite);
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(postFavoriteAction({ status, id }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  const ratingStar = (Math.ceil(rating) * 20).toString();

  return (
    <article
      className="cities__card place-card"
      onMouseOver={() => onMouseOver(id)}
      onClick={handleClickOffer}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <Link to={`${AppRoute.Offers}/${id}`}>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </div>
      </Link>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={
              isFavorite
                ? 'place-card__bookmark-button--active button'
                : 'place-card__bookmark-button button'
            }
            type="button"
            onClick={handleClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingStar}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">{title}</h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferPreviewCard;
