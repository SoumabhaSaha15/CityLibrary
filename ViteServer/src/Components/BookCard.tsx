import { ImQuill } from "react-icons/im";
import { IoLanguageSharp } from "react-icons/io5";
import { type PartialBook } from "@/validators/book";
import RippleButton from "@/components/RippleButton";
interface BookCardProps {
  book: PartialBook;
}

const BookCard = ({ book }: BookCardProps) => {
  const authorNames = book.authors.map((a) => a.author_name).join(", ");

  return (
    <div className="card bg-base-100 w-full max-w-sm h-full hover:shadow-lg hover:shadow-accent-content scale-95 hover:scale-100 transition-transform">
      <figure className="aspect-3/4 w-full overflow-hidden">
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
          <RippleButton type="button" className="btn btn-primary flex-1">
            Details
          </RippleButton>
          <RippleButton type="button" className="btn btn-accent flex-1">
            Borrow
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
