import React from "react"
import { Stack, Loader, List, Button } from "@mantine/core"
import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "src/features/todos /queries/getTodos"
import { Suspense } from "react"
import addTodo from "src/features/todos /mutations/addTodo"
import { notifications } from "@mantine/notifications"

const Todos = () => {
  const [todos] = useQuery(getTodos, {
    search: "12312",
  })

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: "You rock! 🎉",
        message: result,
      })
    },
  })

  return (
    <Stack>
      <Button
        onClick={() => {
          $addTodo({ todoTitle: "new todo" })
        }}
      >
        Add todo
      </Button>
      <List>
        {todos.map((todo) => (
          <p>{todo.title}</p>
        ))}
      </List>
    </Stack>
  )
}

const todosPage: BlitzPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />} />
      <Todos />
    </Layout>
  )
}
export default todosPage
