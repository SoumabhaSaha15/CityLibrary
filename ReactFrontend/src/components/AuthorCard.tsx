import { Card, CardBody, Chip, Image, Button } from "@heroui/react";
import { type Author } from "../validator/author";
import { FaGlobe, FaCalendar, FaArrowRight } from "react-icons/fa";
const AuthorCard: React.FC<{ author: Author }> = ({ author }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 scale-95 hover:scale-100">
      <CardBody className="p-0">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4">
          {/* Author Image */}
          <div className="flex flex-shrink-0 w-full md:w-auto items-center justify-center">
            <Image
              alt={`${author.author_name} profile`}
              src={author.author_image}
              className="object-cover w-full h-48 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-lg"
            />
          </div>

          {/* Author Details */}
          <div className="flex flex-col justify-between flex-1 gap-2 md:gap-3 min-w-0">
            <div>
              {/* Name */}
              <h3 className="text-lg md:text-xl font-semibold mb-2 line-clamp-1">
                {author.author_name}
              </h3>

              {/* Nationality & Gender Chips */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                <Chip
                  startContent={<FaGlobe className="text-xs md:text-sm" />}
                  size="sm"
                  variant="flat"
                  classNames={{
                    base: "h-6 md:h-7",
                    content: "text-xs md:text-sm",
                  }}
                >
                  {author.nationality}
                </Chip>
                <Chip
                  size="sm"
                  variant="flat"
                  className="capitalize h-6 md:h-7"
                  classNames={{
                    content: "text-xs md:text-sm",
                  }}
                >
                  {author.gender}
                </Chip>
              </div>
              {/* Description */}
              <p className="text-xs md:text-sm text-default-600 line-clamp-2 mb-2 md:mb-3">
                {author.author_description}
              </p>
            </div>

            {/* Footer: Birth Date & View Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 md:gap-2 text-default-500">
                <FaCalendar className="text-sm md:text-base flex-shrink-0" />
                <p className="text-xs md:text-sm">
                  {new Date(author.born_on).toLocaleDateString()}
                </p>
              </div>

              <Button
                size="sm"
                color="primary"
                variant="flat"
                endContent={<FaArrowRight className="text-xs" />}
                className="w-full sm:w-auto text-xs md:text-sm"
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default AuthorCard;
