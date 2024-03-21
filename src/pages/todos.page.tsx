import React from "react"
import { Stack, List, Button, Input, Checkbox, Text, Group } from "@mantine/core"
import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "src/features/todos /queries/getTodos"
import addTodo from "src/features/todos /mutations/addTodo"
import { useState } from "react"
import toggleTodo from "src/features/todos /mutations/toggleTodo"
import cleanCompleted from "src/features/todos /mutations/cleanCompleted"
import { PromiseReturnType } from "blitz"
import { z } from "zod"
import { TodoInput } from "src/features/todos /schemas"
import { useForm, zodResolver } from "@mantine/form"

type todoAsReturnedFromTheServer = PromiseReturnType<typeof getTodos>
type TodoType = todoAsReturnedFromTheServer[0]
type TodoFormType = z.infer<typeof TodoInput>

const Todos: React.FC<{
  todos: TodoType
}> = () => {
  const [todos] = useQuery(getTodos, {})
  const [$addTodo, { isLoading }] = useMutation(addTodo, {})
  const [$cleanCompleted] = useMutation(cleanCompleted, {})

  const form = useForm<TodoFormType>({
    validate: zodResolver(TodoInput),
  })

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
      <form
        onSubmit={form.onSubmit(async (values) => {
          await $addTodo(values)
        })}
      >
        <Input mb={25} placeholder="Add todo" {...form.getInputProps("todoTitle")} />

        <Button loading={isLoading} type="submit">
          Create todo
        </Button>
      </form>
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
      {/* @ts-ignore */}
      <Todos />
    </Layout>
  )
}
export default todosPage
