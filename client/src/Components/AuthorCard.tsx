import { useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { type PartialAuthor } from "@/validators/author";
import { FaUser, FaGlobe, FaBook } from "react-icons/fa";

interface AuthorCardProps {
  author: PartialAuthor;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`card h-full w-full shadow-sm hover:shadow-lg transition-shadow duration-300 ${
        imageFailed ? "bg-base-200" : "image-full"
      }`}
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
        className="btn btn-circle btn-lg absolute top-3 right-3 z-10 border-none bg-base-100/90 text-primary shadow backdrop-blur-sm hover:bg-primary hover:text-primary-content"
      >
        <BiSolidUserDetail className="h-6 w-6" />
      </button>

      <div className="card-body justify-end gap-1.5 overflow-hidden p-4">
        <div className="flex flex-wrap gap-1">
          <span className="badge badge-secondary badge-md border-none px-1.5 py-2">
            {author.nationality}
          </span>
        </div>

        <h2
          className="card-title text-lg leading-snug text-neutral-content line-clamp-2 sm:text-base font-black"
          title={author.author_name}
        >
          {imageFailed && <FaUser className="h-3.5 w-3.5 shrink-0" />}
          {author.author_name}
        </h2>

        <div className="flex min-w-0 items-center gap-1.5 text-lg text-neutral-content/80">
          <FaGlobe className="h-4 w-4 shrink-0" />
          <span className="truncate">{author.nationality}</span>
        </div>

        <div className="card-actions justify-end pt-1">
          <button
            type="button"
            className="btn btn-primary rounded-full btn-md gap-1"
          >
            <FaUser className="h-4 w-4" />
            View Profile
          </button>
          <button
            type="button"
            className="btn btn-outline rounded-full btn-md gap-1"
          >
            <FaBook className="h-4 w-4" />
            Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
