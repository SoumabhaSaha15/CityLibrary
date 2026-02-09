import {
  FaUser,
  FaGlobe,
  FaCalendar,
  FaVenusMars,
  FaBook,
  FaMars,
  FaVenus,
  FaTransgender,
} from "react-icons/fa";
import { type Author } from "@/validators/author";
import { BiSolidUserDetail } from "react-icons/bi";

interface AuthorCardProps {
  author: Author;
}
const AuthorCard = ({ author }: AuthorCardProps) => {
  const getGenderLabel = (gender: string) => {
    const labels = {
      m: "Male",
      f: "Female",
      t: "Transgender",
      unknown: "Not Specified",
    };
    return labels[gender as keyof typeof labels] || "Not Specified";
  };

  const getGenderIcon = (gender: string) => {
    const icons = {
      m: <FaMars className="w-3 h-3 text-blue-500 shrink-0" />,
      f: <FaVenus className="w-3 h-3 text-pink-500 shrink-0" />,
      t: <FaTransgender className="w-3 h-3 text-purple-500 shrink-0" />,
      unknown: <FaVenusMars className="w-3 h-3 text-gray-500 shrink-0" />,
    };
    return icons[gender as keyof typeof icons] || icons.unknown;
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex-row overflow-hidden max-w-full max-h-full min-h-full min-w-full">
      <figure className="relative w-30 sm:w-48 md:w-56 h-64 sm:h-auto shrink-0">
        <img
          src={author.author_image}
          alt={author.author_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <button className="btn btn-circle btn-primary btn-sm shadow-lg">
            <BiSolidUserDetail className="w-5 h-5" />
          </button>
        </div>
      </figure>

      <div className="card-body overflow-hidden">
        <h2 className="card-title text-lg sm:text-xl">
          <FaUser className="w-5 h-5 text-primary shrink-0" />
          <span className="line-clamp-1">{author.author_name}</span>
        </h2>

        <div className="flex flex-wrap gap-2 my-1">
          <span className="badge badge-primary badge-sm">Author</span>
          <span className="badge badge-secondary badge-sm">
            {author.nationality}
          </span>
        </div>

        <p className="text-sm text-base-content/70 line-clamp-3 overflow-hidden">
          {author.author_description}
        </p>

        <div className="space-y-1 mt-2 overflow-hidden">
          <div className="flex items-center gap-2 text-xs">
            <FaCalendar className="w-3 h-3 text-info shrink-0" />
            <span className="font-semibold shrink-0">Born:</span>
            <span className="truncate">
              {new Date(author.born_on).toLocaleDateString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <FaGlobe className="w-3 h-3 text-success shrink-0" />
            <span className="font-semibold shrink-0">Nationality:</span>
            <span className="truncate">{author.nationality}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {getGenderIcon(author.gender)}
            <span className="font-semibold shrink-0">Gender:</span>
            <span className="truncate">{getGenderLabel(author.gender)}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-sm gap-2">
            <FaUser className="w-4 h-4" />
            View Profile
          </button>
          <button className="btn btn-outline btn-sm gap-2">
            <FaBook className="w-4 h-4" />
            Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
