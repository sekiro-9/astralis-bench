// Framework floor: a route with zero library imports. Whatever JS this route
// ships is Next + React's own cost; the bench page's number minus this one is
// what the LIBRARY adds.
export default function EmptyPage() {
  return <main>empty</main>;
}
