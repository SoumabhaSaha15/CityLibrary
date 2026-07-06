import { useState } from "react";
import { FaBook, FaLanguage, FaUser } from "react-icons/fa";
import { BiSolidBookmark } from "react-icons/bi";
import { type PartialBook } from "@/validators/book";

interface BookCardProps {
  book: PartialBook;
}

const VISIBLE_GENRES = 2;

const BookCard = ({ book }: BookCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  const visibleGenres = book.book_genre.slice(0, VISIBLE_GENRES);
  const hiddenGenreCount = book.book_genre.length - visibleGenres.length;

  const authorNames = book.authors.map((a) => a.author_name).join(", ");

  return (
    <div
      className={`card h-full w-full shadow-sm hover:shadow-lg transition-shadow duration-300 ${
        imageFailed ? "bg-base-200" : "image-full"
      }`}
    >
      <figure>
        {!imageFailed && (
          <img
            src={book.book_cover}
            alt={book.book_name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain bg-base-200"
          />
        )}
      </figure>

      <button
        type="button"
        aria-label="Bookmark this book"
        className="btn btn-circle btn-lg absolute top-3 right-3 z-10 border-none bg-base-100/90 text-primary shadow backdrop-blur-sm hover:bg-primary hover:text-primary-content"
      >
        <BiSolidBookmark className="h-6 w-6" />
      </button>

      <div className="card-body justify-end gap-1.5 overflow-hidden p-4">
        <div className="flex flex-wrap gap-1">
          {visibleGenres.map((genre) => (
            <span
              key={genre}
              className="badge badge-primary badge-md border-none px-1.5 py-2"
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

        <h2
          className="card-title text-lg leading-snug text-neutral-content line-clamp-2 sm:text-base font-black"
          title={book.book_name}
        >
          {imageFailed && <FaBook className="h-3.5 w-3.5 shrink-0" />}
          {book.book_name}
        </h2>

        <div className="flex min-w-0 items-center gap-1.5 text-lg text-neutral-content/80">
          <FaUser className="h-6 w-6 shrink-0" />
          <span className="truncate" title={authorNames}>
            {authorNames}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-1.5 text-lg text-neutral-content/80">
          <FaLanguage className="h-8 w-8 shrink-0" />
          <span className="truncate">{book.book_language}</span>
        </div>

        <div className="card-actions justify-end pt-1">
          <button
            type="button"
            className="btn btn-primary rounded-full btn-md gap-1 sm:btn-sm"
          >
            <FaBook className="h-3 w-3" />
            Details
          </button>
          <button
            type="button"
            className="btn btn-outline rounded-full btn-md sm:btn-sm"
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
