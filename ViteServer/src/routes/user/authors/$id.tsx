import { createFileRoute, Link } from "@tanstack/react-router";
import authorQueryOptionsById from "@/hooks/fetchAuthorById";

export const Route = createFileRoute("/user/authors/$id")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params }) =>
    await queryClient.ensureQueryData(
      authorQueryOptionsById(Number(params.id)),
    ),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  const getGenderLabel = (gender: string) => {
    const genderMap: Record<string, string> = {
      m: "Male",
      f: "Female",
      t: "Non-binary",
      unknown: "Not specified",
    };
    return genderMap[gender] || "Not specified";
  };

  return (
    <>
      <div className="breadcrumbs text-sm px-2 bg-linear-210 from-primary to-accent via-secondary">
        <ul>
          <li>
            <Link to={"/user/authors"} className="link" preload={false}>
              authors
            </Link>
          </li>
          <li>id:{data.author_id}</li>
        </ul>
      </div>
      <div className="hero max-h-[calc(100dvh-6.25rem)] h-full custom-grad max-w-full overflow-y-scroll">
        <div className="hero-content flex-col lg:flex-row gap-8">
          {/* Author Image */}
          <figure className="lg:w-1/3">
            <img
              src={data.author_image}
              alt={data.author_name}
              className="shadow-lg w-full max-w-sm rounded-lg hover:scale-90 transition-transform hover:shadow-accent hover:shadow-lg aspect-3/4 object-contain bg-base-content"
            />
          </figure>

          {/* Author Info */}
          <div className="lg:w-2/3">
            {/* Name */}
            <h1 className="text-5xl font-bold mb-4">{data.author_name}</h1>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge badge-primary">{data.nationality}</span>
              <span className="badge badge-secondary">
                {getGenderLabel(data.gender)}
              </span>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed mb-8 max-w-full">
              {data.author_description}
            </p>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-6 mb-8 text-sm font-medium">
              <div>
                <p className="text-base-content/60 mb-1">Born</p>
                <p className="text-base">
                  {new Date(data.born_on).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-base-content/60 mb-1">Nationality</p>
                <p className="text-base">{data.nationality}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
