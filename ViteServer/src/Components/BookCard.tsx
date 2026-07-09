import { ImQuill } from "react-icons/im";
import { useRipple } from "use-ripple-hook";
import { IoLanguageSharp } from "react-icons/io5";
import { type PartialBook } from "@/validators/book";

interface BookCardProps {
  book: PartialBook;
}

const BookCard = ({ book }: BookCardProps) => {
  const [detailsRipple, detailsEvent] = useRipple({ color: "currentColor" });
  const [borrowRipple, borrowEvent] = useRipple({ color: "currentColor" });

  const authorNames = book.authors.map((a) => a.author_name).join(", ");

  return (
    <div className="card bg-base-100 w-full max-w-sm h-full hover:shadow-2xl hover:shadow-accent-content">
      <figure className="h-3/4">
        <img
          src={book.book_cover}
          alt={book.book_name}
          className="h-full w-full object-cover object-top"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title" title={book.book_name}>
          {book.book_name}
          <div className="badge badge-secondary">{book.book_genre[0]}</div>
        </h2>

        <div className="flex min-w-0 items-center gap-1.5 text-sm text-base-content/70">
          <ImQuill className="h-4 w-4 shrink-0" />
          <span className="truncate" title={authorNames}>
            {authorNames}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-1.5 text-sm text-base-content/70">
          <IoLanguageSharp className="h-4 w-4 shrink-0" />
          <span className="truncate">{book.book_language}</span>
        </div>

        <div className="card-actions justify-end">
          <button
            type="button"
            className="btn btn-primary flex-1"
            ref={detailsRipple}
            onPointerDown={detailsEvent}
          >
            Details
          </button>
          <button
            type="button"
            className="btn btn-accent flex-1"
            ref={borrowRipple}
            onPointerDown={borrowEvent}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
