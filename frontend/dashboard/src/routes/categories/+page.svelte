<script lang="ts">
	import RequestOptions from '$lib/components/RequestOptions.svelte';
	import { onMount } from 'svelte';
	import { Requests } from '$lib/utils';
	import type { DevEnv, Method } from '$lib/utils';

	let data = {
		name: '',
		parent_id: null
	};

	let devEnvironemt: DevEnv = 'dev';

	let currentCategories: { id: string; name: string; parent_id: string | null }[] = [];

	async function fetchCategories() {
		await Requests.makeAuthRequest(devEnvironemt, 'GET', 'categories')
			.then((resp) => resp.json())
			.then((data) => {
				currentCategories = data['data'];
			})
			.catch((err) => {
				console.error(err);
			});
	}

	onMount(async () => {
		await fetchCategories();
	});
</script>

<RequestOptions
	bind:data
	method="POST"
	actionName="categories"
	bind:devEnvironemt
	changeHandler={fetchCategories}
/>
<input
	bind:value={data.name}
	required
	type="text"
	placeholder="Name"
	class="input input-bordered w-full max-w-xs"
/>
<select class="select select-bordered w-full max-w-xs" bind:value={data.parent_id}>
	<option disabled selected value={null}>Parent Id</option>
	{#each currentCategories as category}
		<option value={category.id}>{category.name}</option>
	{/each}
</select>
