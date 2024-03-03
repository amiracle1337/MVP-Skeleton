import React from "react"
import { Stack, Loader, List, Button, Input } from "@mantine/core"
import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "src/features/todos /queries/getTodos"
import { Suspense } from "react"
import addTodo from "src/features/todos /mutations/addTodo"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

const Todos = () => {
  const [todoTitle, setTodoTitle] = useState("")
  const [todos] = useQuery(getTodos, {
    search: "12312",
  })

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "You rock! 🎉",
        message: `created todo ${todo.title}`,
      })
    },
  })

  return (
    <Stack>
      <Input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add todo"
      />
      <Button
        onClick={async () => {
          await $addTodo({ todoTitle: todoTitle })
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
