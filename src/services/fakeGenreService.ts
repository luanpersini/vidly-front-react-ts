// export function getGenres() {
//   const data = [
//     { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
//     { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
//     { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
//   ];
//   const genres = [{ _id: "", name: "All Genres" }, ...data];
//   return genres.filter(g => g);
// }

export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
];

export function getGenres() {
  const data = genres.filter(g => g);
  return [{ _id: "", name: "All Genres" }, ...data]; 
}