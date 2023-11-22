import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hooks';
import ReviewFrom from './review-form/review-form';
import Review from './review/review';

function Reviews() {
  const comments = useAppSelector((state) => state.offer.comments);
  const authorizationStatus = useAppSelector(
    (state) => state.auth.authorizationStatus
  );

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <Review review={comment} key={comment.id} />
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewFrom />}
    </section>
  );
}

export default Reviews;