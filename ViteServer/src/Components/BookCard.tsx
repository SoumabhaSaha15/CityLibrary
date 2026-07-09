import { cn } from "@/util/cn";
import { useState } from "react";
import { ImQuill } from "react-icons/im";
import { useRipple } from "use-ripple-hook";
import { BiSolidBookmark } from "react-icons/bi";
import { IoLanguageSharp } from "react-icons/io5";
import { type PartialBook } from "@/validators/book";
interface BookCardProps {
  book: PartialBook;
}

const VISIBLE_GENRES = 2;

const BookCard = ({ book }: BookCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [borrowRipple, borrowEvent] = useRipple({ color: "currentColor" });
  const [detailsRipple, detailsEvent] = useRipple({ color: "currentColor" });
  const [bookmarkRipple, bookmarkEvent] = useRipple({ color: "currentColor" });
  const visibleGenres = book.book_genre.slice(0, VISIBLE_GENRES);
  const hiddenGenreCount = book.book_genre.length - visibleGenres.length;

  const authorNames = book.authors.map((a) => a.author_name).join(", ");

  return (
    <div
      className={cn(
        "card h-full w-full shadow-sm hover:shadow-lg transition-shadow duration-300",
        imageFailed ? "bg-base-200" : "image-full",
      )}
    >
      <figure>
        {!imageFailed && (
          <img
            src={book.book_cover}
            alt={book.book_name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover bg-base-200"
          />
        )}
      </figure>

      <button
        type="button"
        aria-label="Bookmark this book"
        ref={bookmarkRipple}
        onPointerDown={bookmarkEvent}
        className="btn btn-circle btn-md absolute top-3 right-3 z-1 border-none bg-base-100/90 text-primary shadow backdrop-blur-sm hover:bg-primary hover:text-primary-content"
      >
        <BiSolidBookmark className="h-6 w-6" />
      </button>

      <div className="card-body justify-end gap-1.5 overflow-hidden p-4">
        <h1
          className="card-title text-xl leading-snug text-neutral-content line-clamp-2 font-black"
          title={book.book_name}
        >
          {book.book_name}
        </h1>

        <div className="flex flex-wrap gap-1">
          {visibleGenres.map((genre) => (
            <span
              key={genre}
              className="badge badge-secondary badge-md border-none px-1.5 py-2 text-secondary-content font-black"
            >
              {genre}
            </span>
          ))}
          {hiddenGenreCount > 0 && (
            <span className="badge badge-ghost badge-lg border-none bg-base-100/80 px-1.5 py-2">
              +{hiddenGenreCount}
            </span>
          )}
        </div>

        <div className="flex min-w-0 items-center gap-1.5 text-lg text-neutral-content/80">
          <ImQuill className="h-4 w-4 shrink-0" />
          <span className="truncate" title={authorNames}>
            {authorNames}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-1.5 text-lg text-neutral-content/80">
          <IoLanguageSharp className="h-4 w-4 shrink-0" />
          <span className="truncate">{book.book_language}</span>
        </div>

        <div className="card-actions justify-end pt-1">
          <button
            type="button"
            className="btn btn-primary rounded-lg btn-md"
            ref={detailsRipple}
            onPointerDown={detailsEvent}
          >
            Details
          </button>
          <button
            type="button"
            className="btn btn-accent rounded-lg btn-md"
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
