// storageReviews.js

// Initialize reviews with some sample data
export const initReviews = () => {
  if (!localStorage.getItem("reviews")) {
    const initialReviews = [
        {
            userId: 1, // must match a user in localStorage "users"
            productId: 1,
            rating: 5,
            text: "Elegant and long-lasting fragrance. Highly recommended!",
            date: "2026-03-30"
        },
        {
            userId: 2,
            productId: 1,
            rating: 4,
            text: "Great scent, but a bit strong for daily wear.",
            date: "2026-03-31"
        }
        ];

    localStorage.setItem("reviews", JSON.stringify(initialReviews));
  }
};

export const getReviews = () => {
  const data = localStorage.getItem("reviews");
  return data ? JSON.parse(data) : [];
};

export const addReview = (review) => {
  const reviews = getReviews();
  reviews.push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));
};
