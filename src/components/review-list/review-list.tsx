import { useMemo } from 'react';
import { Review } from '../../types/review';
import { formatDate } from '../../util';

type ReviewListProps = {reviews:Review[]}

export const ReviewList = ({reviews}:ReviewListProps)=> {
  const sortedReviews = useMemo(() => [...reviews].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,10), [reviews]);
  return (
    <ul className="reviews__list">
      {sortedReviews.map((i) =>
        (
          <li className="reviews__item" key={i.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={i.user.avatarUrl}
                  width={54}
                  height={54}
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">{i.user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width:  `${(Math.round(i.rating) * 100 / 5)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {i.comment}
              </p>
              <time className="reviews__time" dateTime={i.date.toString()}>{formatDate(new Date(i.date))}</time>
            </div>
          </li>)
      )}
    </ul>
  );
};
