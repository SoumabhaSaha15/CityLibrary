import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Chip,
  Image,
  Button,
  Divider,
  // Avatar,
  // AvatarGroup,
} from "@heroui/react";
import {
  // FaBook,
  FaCalendar,
  FaArrowRight,
  FaLanguage,
  FaBarcode,
} from "react-icons/fa";
import { type Book } from "../validator/book";

const BookCard: React.FC<Book> = (book) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 scale-95 hover:scale-100">
      <CardHeader className="flex-col items-start gap-2">
        <h3 className="text-lg md:text-xl font-semibold line-clamp-2 w-full">
          {book.book_name}
        </h3>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs md:text-sm text-default-500">by</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-default-700 font-medium line-clamp-1">
              {book.authors.map((author) => author.author_name).join(", ")}
            </p>
          </div>
        </div>
      </CardHeader>

      <Divider />

      <CardBody className="p-0">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4">
          {/* Book Cover */}
          <div className="flex flex-shrink-0 w-full md:w-auto items-center justify-center">
            <Image
              alt={`${book.book_name} cover`}
              src={book.book_cover}
              className="object-cover w-full h-56 md:w-32 md:h-48 lg:w-36 lg:h-52 rounded-lg shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col justify-between flex-1 gap-2 md:gap-3 min-w-0">
            <div>
              {/* Genre Tags */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                {book.book_genre.slice(0, 3).map((genre, index) => (
                  <Chip
                    key={index}
                    size="sm"
                    variant="flat"
                    color="secondary"
                    classNames={{
                      base: "h-6 md:h-7",
                      content: "text-xs md:text-sm",
                    }}
                  >
                    {genre}
                  </Chip>
                ))}
                {book.book_genre.length > 3 && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="default"
                    classNames={{
                      base: "h-6 md:h-7",
                      content: "text-xs md:text-sm",
                    }}
                  >
                    +{book.book_genre.length - 3}
                  </Chip>
                )}
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-default-600 line-clamp-3 mb-2 md:mb-3">
                {book.book_description}
              </p>
            </div>

            {/* Language & ISBN */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 md:gap-2 text-default-500">
                <FaLanguage className="text-sm md:text-base flex-shrink-0" />
                <p className="text-xs md:text-sm">{book.book_language}</p>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-default-500">
                <FaBarcode className="text-sm md:text-base flex-shrink-0" />
                <p className="text-xs md:text-sm font-mono">{book.book_isbn}</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>

      <Divider />

      <CardFooter>
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-1.5 md:gap-2 text-default-500">
            <FaCalendar className="text-sm md:text-base flex-shrink-0" />
            <p className="text-xs md:text-sm">
              {new Date(book.published_on).toLocaleDateString()}
            </p>
          </div>

          <Button
            size="sm"
            color="primary"
            variant="flat"
            radius="full"
            endContent={<FaArrowRight className="text-xs" />}
            className="text-xs md:text-sm"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default BookCard;
