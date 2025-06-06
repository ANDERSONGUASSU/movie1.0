import MovieList from "../components/MovieList";

import DefaultLayout from "@/src/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section>
        <div>
          <MovieList />
        </div>
      </section>
    </DefaultLayout>
  );
}
