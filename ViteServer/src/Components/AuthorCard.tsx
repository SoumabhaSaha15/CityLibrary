import RippleButton from "@/components/RippleButton";
import { BiSolidUserDetail } from "react-icons/bi";
import { type PartialAuthor } from "@/validators/author";
import { useNavigate } from "@tanstack/react-router";

interface AuthorCardProps {
  author: PartialAuthor;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 w-full max-w-sm h-full hover:shadow-lg hover:shadow-accent-content scale-95 hover:scale-100 transition-transform">
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
          <RippleButton
            type="button"
            className="btn btn-primary w-full"
            onClick={() => {
              navigate({
                to: "/user/authors/$id",
                params: { id: author.author_id.toString() },
              });
            }}
          >
            <BiSolidUserDetail className="h-4 w-4" />
            View Author
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
