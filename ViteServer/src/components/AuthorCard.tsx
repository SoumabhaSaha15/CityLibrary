import { useNavigate } from "@tanstack/react-router";
import RippleButton from "@/components/RippleButton";
import { type PartialAuthor } from "@/validators/author";

interface AuthorCardProps {
  author: PartialAuthor;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-300 h-full w-full max-w-sm lg:max-w-md shrink-0 shadow-md scale-95 hover:scale-100 hover:shadow-accent-content transition-transform">
      <div className="card-body p-2">
        <form className="fieldset space-y-2 p-1" aria-label="author-id-card">
          {/* Avatar Area */}
          <div className="avatar grid place-items-center">
            <div className="w-72 sm:w-56 overflow-hidden aspect-square">
              <img
                src={author.author_image}
                alt={author.author_name}
                className="rounded-lg h-full w-full object-contain object-center bg-base-content"
              />
            </div>
          </div>
          {/* Author Name */}
          <div>
            <label className="label rounded-lg" htmlFor="author_name">
              <span className="label-text font-black">Author Name</span>
            </label>
            <input
              id="author_name"
              type="text"
              value={author.author_name}
              readOnly={true}
              className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent bg-primary/50 font-black text-lg"
            />
          </div>
          {/* Nationality */}
          <div>
            <label className="label rounded-lg" htmlFor="nationality">
              <span className="label-text font-black">Nationality</span>
            </label>
            <input
              id="nationality"
              type="text"
              value={author.nationality}
              readOnly={true}
              className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0 focus:ring-accent bg-secondary/50 font-black text-lg"
            />
          </div>

          {/* Action Button */}
          <RippleButton
            type="button"
            className="btn btn-primary w-full hover:btn-secondary"
            onClick={() => {
              navigate({
                to: "/user/authors/$id",
                params: { id: author.author_id.toString() },
              });
            }}
          >
            View Details
          </RippleButton>
        </form>
      </div>
    </div>
  );
};

export default AuthorCard;
