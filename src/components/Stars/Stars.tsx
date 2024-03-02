const stars = [
  {value:5, label: 'perfect'},
  {value:4, label: 'good'},
  {value:3, label: 'not bad'},
  {value:2, label: 'bad'},
  {value:1, label: 'terrible'},];

export const Stars = () => (
  stars.map((star) => (
    <><input className="form__rating-input visually-hidden" name="rating" value={star.value} id={star.label} type="radio" />
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title={star.label}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>))
);
