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

const Todos = () => {
  const [todoTitle, setTodoTitle] = useState("")
  const [todos] = useQuery(getTodos, {})
  console.log(todos)
  const [$addTodo] = useMutation(addTodo, {})
  const [$cleanCompleted] = useMutation(cleanCompleted, {})

  const Todo = ({ todo }) => {
    const [$toggleTodo] = useMutation(toggleTodo)
    return (
      <Group>
        <Checkbox
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
      <Suspense fallback={<Loader />} />
      <Todos />
    </Layout>
  )
}
export default todosPage
