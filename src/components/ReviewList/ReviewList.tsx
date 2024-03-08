import { Review } from '../../types/review';

type ReviewListProps = {reviews:Review[]}
export const ReviewList = (props:ReviewListProps)=> (
  <ul className="reviews__list">
    {props.reviews.map((i) =>
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
                <span style={{ width: '80%' }} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {i.comment}
            </p>
            <time className="reviews__time" dateTime={i.date}>{i.date}</time>
          </div>
        </li>)
    )}
  </ul>
);
