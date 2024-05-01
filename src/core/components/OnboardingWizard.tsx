import { useState } from "react"
import { Stepper, Button, Group } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import markUserOnboarded from "src/features/auth/mutations/markUserOnboarded"

export function OnboardingWizard() {
  const [active, setActive] = useState(1)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const [$userOnboaded, { isLoading }] = useMutation(markUserOnboarded)

  const isOnFinalOnboardingStep = active === 3

  return (
    <>
      <Stepper size="md" active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl" p={25}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button
          loading={isLoading}
          onClick={async () => {
            if (isOnFinalOnboardingStep) {
              await $userOnboaded({})
            } else {
              nextStep()
            }
          }}
        >
          {isOnFinalOnboardingStep ? "Finish" : "Next"}
        </Button>
      </Group>
    </>
  )
}
