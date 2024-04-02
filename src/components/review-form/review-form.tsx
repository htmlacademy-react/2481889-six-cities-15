import { FC, memo } from 'react';
import { Review } from '../../types/review';
import {CommentaryForm} from '../commentary-form/commentary-form';
import { ReviewList } from '../review-list/review-list';
import { useAppSelector } from '../../hooks/use-app';
import { authSelectors } from '../../slices/auth/auth';
import { AuthorizationStatus } from '../../constants';

type ReviewFormProps = {reviews:Review[]; offerId : string}
const ReviewForm : FC<ReviewFormProps> = (props : ReviewFormProps) => {
  const authorizationStatus = useAppSelector(authSelectors.getAuthorizationStatus);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{props.reviews.length}</span>
      </h2>
      <ReviewList reviews={props.reviews} />
      {authorizationStatus === AuthorizationStatus.Auth ?
        <CommentaryForm offerId={props.offerId}/> :
        <p>Войдите прежде, чем написать комментарий</p>}
    </section>
  );
};

const MemorizedReviewForm = memo(ReviewForm);
export default MemorizedReviewForm;
