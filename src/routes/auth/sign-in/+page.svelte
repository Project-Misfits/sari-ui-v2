<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input/index.js';
	import { signInSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(signInSchema)
	});

	const { form: formData, enhance } = form;
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
						<form class="flex flex-col gap-2" method="POST" action="?/signIn" use:enhance>
							<Form.Field {form} name="username">
								<Form.Control>
									{#snippet children({ props })}
										<Label>Username</Label>
										<Input {...props} bind:value={$formData.username} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<Form.Field {form} name="password">
								<Form.Control>
									{#snippet children({ props })}
										<Label>Password</Label>
										<Input type="password" {...props} bind:value={$formData.password} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<Form.Button>Login</Form.Button>

							<div class="mx-auto">
								<a href="/" class="text-sm font-medium underline">
									<Label>Forgot Account?</Label>
								</a>
								<span> - </span>
								<a href="/auth/sign-up" class="text-sm font-medium underline">
									<Label>Register Now</Label>
								</a>
							</div>
						</form>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</section>
