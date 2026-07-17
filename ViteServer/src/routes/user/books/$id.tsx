import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/books/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/books/$id"!</div>
}
