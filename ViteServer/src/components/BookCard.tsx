import { type PartialBook } from "@/validators/book";
import { useNavigate } from "@tanstack/react-router";
import RippleButton from "@/components/RippleButton";

interface BookCardProps {
  book: PartialBook;
}

const BookCard = ({ book }: BookCardProps) => {
  const authorNames = book.authors.map((a) => a.author_name).join(", ");
  const genres = book.book_genre.join(", ");
  const navigate = useNavigate();

  return (
    <div className="card bg-base-300 w-full h-full overflow-y-scroll max-w-sm lg:max-w-md shrink-0 shadow-md scale-95 hover:scale-100 hover:shadow-accent-content transition-transform">
      <div className="card-body p-2">
        <form className="fieldset space-y-2 p-1" aria-label="book-id-card">
          {/* Cover Image Area */}
          <div className="avatar grid place-items-center">
            <div className="w-56 overflow-hidden aspect-square rounded-lg shadow-inner">
              <img
                src={book.book_cover}
                alt={book.book_name}
                className="h-full w-full object-contain object-center bg-base-content"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <RippleButton
              type="button"
              className="btn btn-primary flex-1 hover:btn-secondary"
              onClick={() => {
                navigate({
                  to: "/user/books/$id",
                  params: { id: book.book_id.toString() },
                });
              }}
            >
              Details
            </RippleButton>
            <RippleButton
              type="button"
              className="btn btn-accent flex-1"
              onClick={() => {
                navigate({
                  to: "/user/books/$id/borrow",
                  params: { id: book.book_id.toString() },
                });
              }}
            >
              Borrow
            </RippleButton>
          </div>

          {/* Book Title */}
          <div>
            <label className="label rounded-lg" htmlFor="book_name">
              <span className="label-text font-black">Book Title</span>
            </label>
            <input
              id="book_name"
              type="text"
              value={book.book_name}
              readOnly={true}
              className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent bg-primary/50 font-black text-lg truncate"
              title={book.book_name}
            />
          </div>

          {/* Authors */}
          <div>
            <label className="label rounded-lg" htmlFor="authors">
              <span className="label-text font-black flex items-center gap-1">
                Authors
              </span>
            </label>
            <input
              id="authors"
              type="text"
              value={authorNames}
              readOnly={true}
              className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent bg-base-200/50 font-bold truncate"
              title={authorNames}
            />
          </div>

          {/* Genre & Language Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label rounded-lg" htmlFor="genre">
                <span className="label-text font-black flex items-center gap-1">
                  Genre
                </span>
              </label>
              <input
                id="genre"
                type="text"
                value={genres || "N/A"}
                readOnly={true}
                className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent bg-secondary/50 font-bold truncate"
              />
            </div>

            <div>
              <label className="label rounded-lg" htmlFor="language">
                <span className="label-text font-black flex items-center gap-1">
                  Language
                </span>
              </label>
              <input
                id="language"
                type="text"
                value={book.book_language}
                readOnly={true}
                className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent bg-base-200/50 font-bold truncate"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCard;
