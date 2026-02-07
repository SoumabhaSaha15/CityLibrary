import {
  FaBook,
  FaLanguage,
  FaCalendar,
  FaBarcode,
  FaUser,
} from "react-icons/fa";
import { BiSolidBookmark } from "react-icons/bi";
import { type Book } from "@/validators/book";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex-col sm:flex-row overflow-hidden max-w-full max-h-full">
      <figure className="relative w-full sm:w-48 md:w-56 h-64 sm:h-auto shrink-0">
        <img
          src={book.book_cover}
          alt={book.book_name}
          className="w-full h-full object-contain bg-base-content"
        />
        <div className="absolute top-4 left-4">
          <button className="btn btn-circle btn-primary btn-sm shadow-lg">
            <BiSolidBookmark className="w-5 h-5" />
          </button>
        </div>
      </figure>

      <div className="card-body overflow-hidden">
        <h2 className="card-title text-lg sm:text-xl">
          <FaBook className="w-5 h-5 text-primary shrink-0" />
          <span className="line-clamp-1">{book.book_name}</span>
        </h2>

        <div className="flex flex-wrap gap-2 my-1">
          {book.book_genre.slice(0, 3).map((genre, index) => (
            <span key={index} className="badge badge-primary badge-sm">
              {genre}
            </span>
          ))}
          {book.book_genre.length > 3 && (
            <span className="badge badge-outline badge-sm">
              +{book.book_genre.length - 3}
            </span>
          )}
        </div>

        <p className="text-sm text-base-content/70 line-clamp-2 overflow-hidden">
          {book.book_description}
        </p>

        <div className="space-y-1 mt-2 overflow-hidden">
          <div className="flex items-center gap-2 text-xs">
            <FaUser className="w-3 h-3 text-secondary shrink-0" />
            <span className="font-semibold shrink-0">Authors:</span>
            <span className="truncate">
              {book.authors.map((a) => a.author_name).join(", ")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <FaLanguage className="w-3 h-3 text-accent shrink-0" />
            <span className="font-semibold shrink-0">Language:</span>
            <span className="truncate">{book.book_language}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <FaCalendar className="w-3 h-3 text-info shrink-0" />
            <span className="font-semibold shrink-0">Published:</span>
            <span className="truncate">
              {new Date(book.published_on).toLocaleDateString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <FaBarcode className="w-3 h-3 text-warning shrink-0" />
            <span className="font-semibold shrink-0">ISBN:</span>
            <span className="font-mono truncate">{book.book_isbn}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-sm gap-2">
            <FaBook className="w-4 h-4" />
            Details
          </button>
          <button className="btn btn-outline btn-sm">Borrow</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
