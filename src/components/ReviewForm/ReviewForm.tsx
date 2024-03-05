import { FC } from 'react';
import { Review } from '../../types/review';
import {CommentaryForm} from '../CommentaryForm/CommentaryForm';
import { ReviewList } from '../ReviewList/ReviewList';

type ReviewFormProps = {reviews:Review[]}

const ReviewForm : FC<ReviewFormProps> = (props : ReviewFormProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{props.reviews.length}</span>
    </h2>
    <ReviewList reviews={props.reviews} />
    <CommentaryForm/>
  </section>
);

export default ReviewForm;
