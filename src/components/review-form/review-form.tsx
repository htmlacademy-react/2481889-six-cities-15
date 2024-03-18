import { FC } from 'react';
import { Review } from '../../types/review';
import {CommentaryForm} from '../commentary-form/commentary-form';
import { ReviewList } from '../review-list/review-list';
import { useAppSelector } from '../../hooks/use-app';
import { authSelectors } from '../../slices/auth';
import { AuthorizationStatus } from '../../constants';

type ReviewFormProps = {reviews:Review[]}
const ReviewForm : FC<ReviewFormProps> = (props : ReviewFormProps) => {
  const authorizationStatus = useAppSelector(authSelectors.authorizationStatus);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{props.reviews.length}</span>
      </h2>
      <ReviewList reviews={props.reviews} />
      {authorizationStatus === AuthorizationStatus.Auth ?
        <CommentaryForm/> :
        <p>Войдите прежде, чем написать комментарий</p>}
    </section>
  );
};

export default ReviewForm;
