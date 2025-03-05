<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input/index.js';
	import { signUpSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageProps } from './$types';
	// import LoaderCircleIcon from 'lucide-svelte/icons/loader-circle';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(signUpSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<section>
	<div class="container mx-auto flex min-h-screen flex-col px-1">
		<div class="m-auto flex items-center justify-center">
			<div class="flex max-w-lg flex-col items-center gap-5">
				<Card.Root class="w-[400px]">
					<Card.Header>
						<Card.Title>
							<img src="/sari.png" alt="sari logo" />
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<form
							class="flex flex-col gap-2"
							method="POST"
							action="?/signUp"
							use:enhance
							novalidate
						>
							<Form.Field {form} name="username">
								<Form.Control>
									{#snippet children({ props })}
										<Label>Username</Label>
										<Input {...props} bind:value={$formData.username} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<Form.Field {form} name="email">
								<Form.Control>
									{#snippet children({ props })}
										<Label>Email</Label>
										<Input type="email" {...props} bind:value={$formData.email} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<div class="grid grid-cols-2 gap-x-5">
								<Form.Field {form} name="first_name">
									<Form.Control>
										{#snippet children({ props })}
											<Label>First Name</Label>
											<Input {...props} bind:value={$formData.first_name} />
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
								<Form.Field {form} name="last_name">
									<Form.Control>
										{#snippet children({ props })}
											<Label>Last Name</Label>
											<Input {...props} bind:value={$formData.last_name} />
										{/snippet}
									</Form.Control>
									<Form.FieldErrors />
								</Form.Field>
							</div>

							<Form.Field {form} name="password">
								<Form.Control>
									{#snippet children({ props })}
										<Label>Password</Label>
										<Input type="password" {...props} bind:value={$formData.password} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<Form.Field {form} name="confirm_password">
								<Form.Control>
									{#snippet children({ props })}
										<Label>Confirm Passowrd</Label>
										<Input type="password" {...props} bind:value={$formData.confirm_password} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							{#if $submitting}
								<Form.Button>
									<!-- <LoaderCircleIcon class="animate-spin" /> -->
									Sign Up
								</Form.Button>
							{:else}
								<Form.Button>Sign Up</Form.Button>
							{/if}

							<div class="text-center">
								<Label>Already have an account?</Label>
								<a href="/auth/sign-in" class="text-sm font-medium underline"> Sign in </a>
							</div>
						</form>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</section>
