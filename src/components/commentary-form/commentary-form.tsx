import { FormEvent, Fragment } from 'react';
import { postReviewAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { reviewsSelectors, setCommentaryText, setRating } from '../../slices/reviews/reviews';
import { NOTCHECK, STARS } from '../../constants';


type CommentaryFormProps = {offerId: string}

export const CommentaryForm = ({offerId}:CommentaryFormProps) => {
  const dispatch = useAppDispatch();

  const blockForm = useAppSelector(reviewsSelectors.getBlockForm);
  const commentaryText = useAppSelector(reviewsSelectors.getCommentaryText);
  const rating = useAppSelector(reviewsSelectors.getRating);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCommentaryText(e.target.value));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRating(parseInt(e.target.value, 10)));
  };

  const CHECKFORM = commentaryText.length > 49 && commentaryText.length < 301
                    && rating !== NOTCHECK;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (offerId && CHECKFORM) {
      dispatch(
        postReviewAction({
          id: offerId,
          comment: commentaryText,
          rating: rating,
        })
      );

    }
  };
  return (
    <form className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STARS.map((star) => (
          <Fragment key={star.value}>
            <input className="form__rating-input visually-hidden"
              name="rating"
              value={star.value}
              id={`${star.value}-stars`}
              type="radio"
              checked={rating === star.value}
              onChange={handleRatingChange}
              disabled={blockForm}
            >
            </input>
            <label htmlFor={`${star.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={star.label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>))}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleInput}
        value={commentaryText}
        disabled={blockForm}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set
          <span className="reviews__star">rating </span>
           and describe your stay with at least
          <b className="reviews__text-amount"> 50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          type="submit"
          disabled={!CHECKFORM || blockForm}
        >Submit
        </button>
      </div>
    </form>
  );
};
