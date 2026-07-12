import { useRipple } from "use-ripple-hook";
import { BiSolidUserDetail } from "react-icons/bi";
import { type PartialAuthor } from "@/validators/author";

interface AuthorCardProps {
  author: PartialAuthor;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
  const [viewRipple, viewEvent] = useRipple({ color: "currentColor" });
  return (
    <div className="card bg-base-100 w-full max-w-sm h-full hover:shadow-2xl hover:shadow-accent-content scale-95 hover:scale-100 transition-transform">
      <figure className="aspect-3/4 w-full overflow-hidden">
        <img
          src={author.author_image}
          alt={author.author_name}
          className="h-full w-full object-cover object-top"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title" title={author.author_name}>
          {author.author_name}
          <div className="badge badge-secondary">{author.nationality}</div>
        </h2>
        <div className="card-actions justify-end">
          <button
            type="button"
            className="btn btn-primary w-full"
            ref={viewRipple}
            onPointerDown={viewEvent}
          >
            <BiSolidUserDetail className="h-4 w-4" />
            View Author
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
