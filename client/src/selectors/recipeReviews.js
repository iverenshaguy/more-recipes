const isReviewed = (reviews, userId) => !!reviews.find(review => review.User.id === userId);

export default { isReviewed };
