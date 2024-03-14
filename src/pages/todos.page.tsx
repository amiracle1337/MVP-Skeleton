import React from "react"
import { Stack, Loader, List, Button, Input, Checkbox, Text, Group } from "@mantine/core"
import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "src/features/todos /queries/getTodos"
import { Suspense } from "react"
import addTodo from "src/features/todos /mutations/addTodo"
import { useState } from "react"
import toggleTodo from "src/features/todos /mutations/toggleTodo"
import cleanCompleted from "src/features/todos /mutations/cleanCompleted"
import { PromiseReturnType } from "blitz"

type todoAsReturnedFromTheServer = PromiseReturnType<typeof getTodos>
type TodoType = todoAsReturnedFromTheServer[0]

const Todos: React.FC<{
  todos: TodoType
}> = () => {
  const [todoTitle, setTodoTitle] = useState("")
  const [todos] = useQuery(getTodos, {})
  const [$addTodo, { isLoading }] = useMutation(addTodo, {})
  const [$cleanCompleted] = useMutation(cleanCompleted, {})

  const Todo = ({ todo }) => {
    const [$toggleTodo, { isLoading }] = useMutation(toggleTodo)
    return (
      <Group>
        <Checkbox
          disabled={isLoading}
          checked={todo.done}
          onClick={async () => {
            await $toggleTodo({ id: todo.id })
          }}
          style={{ padding: "5px" }}
        />
        <Text>{todo.title}</Text>
      </Group>
    )
  }

  return (
    <Stack>
      <Input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add todo"
      />

      <Button
        loading={isLoading}
        onClick={async () => {
          await $addTodo({ todoTitle: todoTitle })
        }}
      >
        Create todo
      </Button>
      <Button onClick={async () => await $cleanCompleted({})}>Clean</Button>
      <List>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} /> // Pass the entire todo object
        ))}
      </List>
    </Stack>
  )
}

const todosPage: BlitzPage = () => {
  return (
    <Layout>
      <Todos />
    </Layout>
  )
}
export default todosPage
