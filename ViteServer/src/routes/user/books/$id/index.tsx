import bookQueryOptionsById from "@/hooks/fetchBookById";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/user/books/$id/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params }) =>
    await queryClient.ensureQueryData(bookQueryOptionsById(Number(params.id))),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return (
    <>
      <div className="breadcrumbs text-sm px-2 bg-linear-120 from-primary/50 to-accent/50 via-secondary/50">
        <ul>
          <li>
            <Link to={"/user/books"} className="link" preload={false}>
              books
            </Link>
          </li>
          <li>id:{data.book_id}</li>
        </ul>
      </div>
      <div className="hero max-h-[calc(100dvh-6.25rem)] h-full bg-base-200 max-w-full overflow-y-scroll">
        <div className="hero-content flex-col lg:flex-row gap-8">
          {/* Book Cover */}
          <figure className="lg:w-1/3">
            <img
              src={data.book_cover}
              alt={data.book_name}
              className="shadow-lg w-full max-w-sm hover:scale-90 transition-transform hover:shadow-accent hover:shadow-lg bg-accent-content"
            />
          </figure>

          {/* Book Info */}
          <div className="lg:w-2/3">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {data.book_genre.map((genre) => (
                <span key={genre} className="badge badge-primary">
                  #{genre}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-4">{data.book_name}</h1>

            {/* Authors */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {data.authors.map((author) => (
                  <Link
                    key={author.author_id}
                    preload={false}
                    to="/user/authors/$id"
                    className="link"
                    params={{ id: author.author_id.toString() }}
                  >
                    {author.author_name}
                    {data.authors.indexOf(author) < data.authors.length - 1
                      ? ","
                      : ""}
                  </Link>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed mb-8 max-w-full">
              {data.book_description}
            </p>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-6 mb-8 text-sm font-medium">
              <div>
                <p className="text-base-content/60 mb-1">ISBN</p>
                <p className="font-mono text-base">{data.book_isbn}</p>
              </div>
              <div>
                <p className="text-base-content/60 mb-1">Language</p>
                <p className="text-base">{data.book_language}</p>
              </div>
              <div>
                <p className="text-base-content/60 mb-1">Published</p>
                <p className="text-base">
                  {new Date(data.published_on).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
