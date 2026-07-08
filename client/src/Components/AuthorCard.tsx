import { cn } from "@/util/cn";
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { type PartialAuthor } from "@/validators/author";

interface AuthorCardProps {
  author: PartialAuthor;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);

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
            src={author.author_image}
            alt={author.author_name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover bg-base-200"
          />
        )}
      </figure>

      <button
        type="button"
        aria-label="View author details"
        className="btn btn-circle btn-lg absolute top-3 right-3 z-1 border-none bg-base-100/90 text-primary shadow backdrop-blur-sm hover:bg-primary hover:text-primary-content"
      >
        <BiSolidUserDetail className="h-6 w-6" />
      </button>

      <div className="card-body justify-end gap-1.5 overflow-hidden p-4">
        <h1
          className="card-title text-xl leading-snug text-neutral-content line-clamp-2 font-black"
          title={author.author_name}
        >
          {author.author_name}
        </h1>

        <div className="flex flex-wrap gap-1"></div>
        <div className="flex min-w-0 items-center gap-1.5 text-lg text-neutral-content/80">
          <span className="badge badge-secondary badge-lg border-none px-1.5 py-2">
            <FaGlobe className="h-4 w-4 shrink-0" />
            {author.nationality}
          </span>
          {/* <span className="truncate">{author.nationality}</span> */}
        </div>

        <div className="card-actions justify-end pt-1">
          <button
            type="button"
            className="btn btn-primary rounded-full btn-md gap-1"
          >
            View Author
          </button>
          <button
            type="button"
            className="btn btn-accent rounded-full btn-md gap-1"
          >
            Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
